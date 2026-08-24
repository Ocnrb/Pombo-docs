---
id: channels-and-ownership
title: Channels and ownership
description: Channel types, on-chain ownership, retention, moderation and discovery.
---

# Channels and ownership

## Channel types

| | Open | Protected | Closed | Gated | Paid |
|---|---|---|---|---|---|
| Read access | Everyone | Password holders | Allowlisted addresses | Token / NFT holders | Active subscribers |
| Write access | Everyone | Password holders | Allowlisted addresses | Token / NFT holders | Active subscribers |
| Access enforced by | — (open by design) | Client-side encryption | On-chain gate contract | On-chain gate contract | On-chain gate contract |
| Content on the wire | Signed plaintext (Pombo format) | AES-256-GCM ciphertext | AES-256-GCM under a channel key | Same | Same |
| Cost to join | Free | Free | Free (owner pays gas to add you) | Holding the asset | The subscription price |

- **Open channels** are public rooms. Anyone can read and write.
- **Protected channels** look public to the network, but every message is encrypted client-side with AES-256-GCM using a key derived from the shared password (PBKDF2, 310,000 iterations). Without the password, the network carries only ciphertext. One caveat: each protected channel publishes a verification challenge that anyone can fetch and test guesses against offline — so the channel is exactly as secret as the password is strong.
- **Closed, Gated and Paid channels** enforce membership *on-chain*, through a small membership contract deployed per channel. This is the only family where access control is enforceable at the protocol level — the network itself refuses messages from authors the contract does not vouch for — and content is encrypted under a channel key that only members obtain. They differ only in the rule the contract enforces: an owner-managed allowlist, holding a token or NFT, or an active subscription. Full detail in [Gated and paid channels](gated-and-paid-channels.md).
- A channel can also be created **read-only** (announcement style): everyone can read, only the owner posts.

:::note[Terminology]
Pombo's source code calls the pre-contract generation of closed channels *native channels*. Those still work, but can no longer be created: closed, gated and paid channels are all backed by a gate contract.
:::

## Ownership

The channel's stream ID literally contains the creator's address: `{ownerAddress}/{id}`. Ownership and permissions are entries in the Streamr registry contracts on Polygon PoS — public blockchain state that no third party, including Pombo, can alter or confiscate.

Two consequences worth understanding:

- **Your channels survive Pombo.** Any client that speaks the protocol can read them.
- **Creating a channel is public.** The creator's address is permanently visible in the channel ID. If you don't want a channel linked to your main identity, create it from a separate account.

## Retention

Channel owners choose how long storage nodes keep message history (1–365 days, default **180**; changeable later in channel settings). Older messages age out of storage; the live network never held them anyway.

## Moderation

Owners moderate through the channel's admin stream: **ban members, hide messages, pin messages**. Clients apply this state when rendering. In gate-backed channels the owner can also appoint **moderators**, who manage membership and bans but cannot erase history or appoint further moderators.

:::caution[Honest limits]
In **open and protected channels**, moderation is *cosmetic*: compliant clients hide banned users' messages, but since accounts are free and instant, a banned user can return with a new address in one click — and the messages still exist on the network for non-compliant clients. Bans are only truly enforceable in **gate-backed channels** (Closed, Gated, Paid), where the contract itself stops refusing to vouch for the banned address.

Two caveats even there: in open channels the ban list is world-readable, and a ban cuts *future* access without unsigning what the member already published. Removing their history is a separate, explicit owner action, available only in Closed channels.
:::

## Discovery and curation

The **Explore** view lists channels that opted into discovery: listing is a choice at creation time, channels are **unlisted by default**, and closed channels are never listed. Gated and paid channels *can* be listed, as [storefronts](gated-and-paid-channels.md#discovery). An unlisted channel publishes no name or description on-chain — only the owner address and creation time are visible. On top of that, the Pombo interface applies a curation manifest — a list of pinned channels and channels hidden *from discovery*. Hiding is interface-level only: a hidden channel still exists on the network and remains reachable by direct link. This reflects Pombo's design split: the *protocol* is neutral and uncensorable; the *interface* curates what it presents.
