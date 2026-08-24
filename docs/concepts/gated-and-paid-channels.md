---
id: gated-and-paid-channels
title: Gated and paid channels
description: Membership contracts on Polygon — closed allowlists, token and NFT gates, and subscriptions.
---

# Gated and paid channels

Three of Pombo's five channel types put membership in a **contract on Polygon**: Closed, Gated and Paid. They share one mechanism and differ only in the rule the contract enforces.

| Type | Who gets in |
|---|---|
| **Closed** | Addresses the owner adds to an allowlist |
| **Gated** | Anyone holding a chosen ERC-20 balance, or any token of a chosen ERC-721 |
| **Paid** | Anyone with an active subscription — a price in a chosen ERC-20, per period |

## One contract per channel

Creating any of the three deploys a **PomboGate** — a minimal membership contract, one [EIP-1167 clone](https://eips.ethereum.org/EIPS/eip-1167) per channel, from a shared factory. The clone costs a single transaction at creation and then answers two questions for the rest of the channel's life:

- **`isValidSignature`** ([ERC-1271]) — *was this author ever a member?* This is what the Streamr Network checks on every message, which is why the clone, not you, is the channel's publisher on the wire.
- **`checkAccess`** — *does this address have access right now?* This drives encryption-key distribution and what the app shows you; it never invalidates messages already published.

[ERC-1271]: https://eips.ethereum.org/EIPS/eip-1271

The consequence worth internalizing: **membership is sticky.** Being removed from an allowlist, letting a subscription lapse, or being banned cuts your *future* access; it does not retroactively unsign what you already wrote. Two things do reach backwards, and both are worth knowing before you write anything you'd hate to lose: an explicit owner `erase` (Closed channels only, where removing someone *is* the ban), and [selling a gate asset](#token-and-nft-gates) without having registered your membership on-chain.

Because there is one grantee for every stream — the clone — adding or removing a member is a transaction on the gate, never a change to the channel's on-chain stream permissions. A Closed channel created with ten initial members costs one batched transaction, not ten.

## Closed channels

The owner (or a moderator) adds and removes Ethereum addresses. Members read and write for free; the owner pays the gas for each membership change.

Closed channels are always **unlisted** — they never appear in Explore, and their name and description stay off-chain. This is the type to use for a private group.

## Token and NFT gates

The gate reads the member's balance at the moment access is checked:

- **Token** — hold at least a minimum balance of a chosen ERC-20. The app offers POL, USDC and DATA as presets, or any contract address.
- **NFT** — hold at least one token of a chosen ERC-721.

Nothing is paid to anyone and there is nothing to register: holding *is* the ticket, re-checked whenever it matters. Entering costs no transaction at all. Sell the asset and you lose access, exactly like someone who never held it.

Selling has a second effect that is easy to miss. The same live check is what vouches for the messages you already published, so once your balance falls below the gate's, your past messages stop validating — and clients verify each message against the contract as they load it, so that history leaves the channel for every reader, not only for you.

Registering your membership on-chain is the one-transaction opt-in that prevents this: it records you permanently, so the contract keeps vouching for you as an author whatever you later do with the asset. It does not extend your *access* — that ends when you sell either way. Only the standing of what you already wrote.

## Paid channels

The owner sets a price in an ERC-20 and a period in days. A subscriber pays, and the contract records an expiry timestamp.

- **The payment goes to the channel owner.** The contract transfers the price straight to them; it takes no fee of its own, and Pombo is not a party to the transaction.
- **Renewing early loses nothing** — a renewal extends from the current expiry, not from the moment you pay.
- **There is no grace period.** Access ends at the recorded timestamp. The app warns you in the three days before, and shows an expired state with a renew action after.
- **Payment is first-person.** The contract deliberately refuses third-party payment: paying for someone else would link payer and beneficiary on-chain forever.
- For tokens that support [EIP-2612](https://eips.ethereum.org/EIPS/eip-2612) permits (such as USDC on Polygon), paying is a single transaction; otherwise it is the usual approve-then-pay pair. Gates priced in POL are settled in wrapped POL, and the app wraps the shortfall for you.

:::caution[A subscription buys the future, not the past]
New subscribers receive only the channel's **current** encryption key, so history published before they joined does not open for them — including files. This is deliberate: without it, one month's subscription would buy everything the channel ever said. See [Encryption](encryption.md#closed-gated-and-paid-channels).
:::

## Moderation

Bans here are the enforceable kind: the contract stops vouching for the address, and the network stops accepting its messages. This is the difference the whole family exists for — elsewhere a ban is [advisory](channels-and-ownership.md#moderation).

Owners can also appoint **moderators**, who add, remove and ban members but cannot erase history, act on the owner or other moderators, or appoint anyone themselves.

## Discovery

Gated and paid channels are the only private types that can be **listed** in Explore. They show their name, description, image and access marker — the condition or the price — so someone can see what they would be joining before acquiring anything. The conversation itself stays encrypted: a listing is a shop window, not a preview.

Closed channels are never listed, whatever the owner picks. The general rules for discovery and curation are in [Channels and ownership](channels-and-ownership.md#discovery-and-curation).

## Honest limits

- **Revocation is not instant.** Encryption keys rotate on a weekly cadence, so someone who sells the gate asset or lets a subscription lapse can still read new messages until the next rotation — and rotations happen only while the channel's admin is online. The contract cuts them off immediately for everything the *contract* controls; the key layer catches up afterwards.
- **The contracts have not been audited.** They are open source (see [pombo-contracts](https://github.com/Pombo-app/pombo-contracts)) and deliberately small, but no third party has reviewed them.
- **Paying is public.** Subscriptions, memberships and bans are contract state on a public blockchain: anyone can see which address pays for which channel, and when.
- **Authorship is not hidden.** The contract is the publisher on the wire, but your account's signature travels beside it in the clear, and it is what the network checks — so it cannot be encrypted, and anyone can recover who wrote what. Content stays private to members; participation does not. The reasoning is in the [privacy model](privacy-model.md#contract-backed-channels).
