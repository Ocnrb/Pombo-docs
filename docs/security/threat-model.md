---
id: threat-model
title: Threat model
description: What Pombo protects, what it trusts, and what it deliberately does not hide. No marketing — the honest list.
---

# Threat model

Privacy tools earn trust by being precise about their limits. This page is the honest list: what Pombo protects, which third parties remain in the picture, and which metadata is visible — including things that are visible *by design*.

## What Pombo protects

- **DM content and sender identity.** DMs are end-to-end encrypted (ECDH + AES-256-GCM) with sealed sender: no party except the recipient — not the network, not storage nodes, not relays — learns the content *or who sent it*.
- **Password-channel content.** Encrypted client-side; the network carries ciphertext published by throwaway keys.
- **Your account on the wire.** In open and protected channels and DMs, message traffic is published under an ephemeral session key, not your wallet. Contract-backed channels are the exception: the membership contract is the publisher, but your account's signature travels with each message and identifies you — as does publishing a read-only channel or a moderation action. See visible metadata below.
- **Private-channel content.** Closed, gated and paid channels are encrypted under a channel key that only members obtain, rotated over time; the network and storage nodes carry ciphertext.
- **Your data at rest.** Keys and app state are encrypted on-device and isolated per account, on both web and Android (in the web app, a few low-sensitivity preferences remain in plain browser storage).
- **Push privacy.** Notifications carry no content, and k-anonymity tags prevent the relay from identifying recipients.

## Trusted or centralized components

Pombo has no backend: no server implements the app, and every piece of infrastructure it touches can be swapped for someone else's. That does not make it free of third parties. Today you are trusting:

| Component | What it could learn or do |
|---|---|
| **Google FCM / Apple APNs** | Learn that your device runs Pombo (inherent to platform push). Cannot see content or contacts. |
| **The push relay** (one in production today) | Sees tag buckets and timing. If down, push stops (messaging is unaffected). |
| **Public RPCs and ENS infrastructure** | Polygon RPCs serve chain queries, Ethereum RPCs resolve ENS names (with decoy queries), and the ipfs.io gateway serves ENS avatars — all see the requests and your IP. You can configure your own RPC endpoint. |
| **The Graph** | Serves channel-type and membership queries. The app ships with a shared default API key (you can configure your own). |
| **The default storage cluster** | Run by the Pombo project (two replicated servers, one operator). Holds ciphertext for protected channels, contract-backed channels and DMs; plaintext for open channels — like any storage node you could choose instead. Loading history is a direct request to it, so it also learns the addresses that read a channel and when. |
| **The PomboGate contracts** | Decide who may participate in every closed, gated and paid channel, and route subscription payments (the contract never custodies them — the transfer goes straight to the channel owner). Open source and not upgradeable once deployed, but **not audited**. A flaw there is a flaw in access control and payment, not in the confidentiality of other channel types. |
| **app.pombo.cc itself** | A hosted interface. Its operator controls what *this interface* shows (e.g. Explore curation) — but not the protocol, and alternate clients are possible. |

## The web client's security policy

The web app's CSP makes a single bet: **no third-party code ever runs**. Every script is bundled and served from the app's own origin; external scripts, inline scripts and `eval` are refused. Stealing keys requires compromising the app's code or its delivery — injecting content is not enough.

Outbound connections are deliberately **not** restricted: custom RPC endpoints and custom storage nodes are user-configurable, and storage nodes resolve from an on-chain registry, so a fixed allowlist is incompatible with user-chosen infrastructure. (ENS avatars can live on any HTTPS host, so image loading is open for the same reason.)

The accepted risk follows: if attacker code ever does run in the app's origin — an XSS that beats the sanitizer, a poisoned dependency, compromised hosting — nothing contains it. It can read the encrypted keystore and crack your password offline, and capture the key while the wallet is unlocked. **Origin compromise means vault compromise; your password's strength is the last line of defense** (scrypt makes each guess expensive).

## Visible metadata

Things an observer can see, some inherent to the design:

- **Open channels are public.** Anyone implementing the message format can recover the real account behind each message and correlate a person's activity **across open channels**. The countermeasure is using separate accounts, not a setting.
- **Channel creators are permanent public record** — the creator's address is embedded in the channel ID.
- **Membership of contract-backed channels is on-chain** and queryable by anyone: allowlists, bans, and — in paid channels — who subscribed and until when. Paying for a channel is a public act.
- **Moderation is visible.** In open channels the moderation state (ban lists, pins) is world-readable; in protected channels it is encrypted for members; in contract-backed channels it is member-only. In every type, though, moderation actions are published by the **owner's real wallet**, exposing the owner and the timing of each action.
- **Your wallet signs everything you publish in closed, gated, paid and read-only channels** (all traffic, including file uploads), in the clear — the membership contract is the publisher, but it is not a mask, and [it cannot be](../concepts/privacy-model.md#contract-backed-channels). Elsewhere, file uploads ride the channel's throwaway identity like any other message.
- **Stream history is served without authentication.** Storage nodes answer unauthenticated HTTPS requests for any stream's retained messages, asking for no proof of membership — access control in Pombo is cryptographic, not perimetral. Content stays sealed, so this changes nothing for DMs, protected channels or public ones. What it changes is reach: in contract-backed channels the authorship graph above — which account wrote in which channel, and when — can be harvested for the whole retention window, offline, by someone who never passed the gate and never joined the network.
- **Protected channels are brute-forceable offline.** Each publishes a password-verification challenge that anyone can fetch and grind guesses against (at a costly 310k PBKDF2 iterations per guess). A protected channel is exactly as secret as its password is strong.
- **DM inboxes are enumerable, and their traffic pattern is public.** Given any Ethereum address, anyone can find its inbox and encryption public key. The on-chain permission restricts *subscribing* to the owner, but it does not gate the storage node's history: the unauthenticated read above returns the retained envelopes of any inbox, so arrival times and message counts are open to anyone. Sealed sender still holds — each envelope carries a different throwaway publisher and its content stays encrypted — so what leaks is timing and volume, never correspondents. Sealed sender hides *who wrote*, not *that something arrived*.

  For a threat model that includes traffic analysis, this is the residual to weigh: a watcher who checks an inbox periodically learns your messaging rhythm without ever learning a single contact.
- **Reading history reveals you to the node you read from.** Opening a channel fetches its retained messages over HTTPS from the storage node it uses, so that operator sees your address and which channels you open, whether the node is ours or a third party's. The content stays sealed; the pattern does not.
- **A DM you send is retained under the recipient's settings, not yours.** It lives in their inbox, on the node they chose, for as long as they chose. This is the one exposure you cannot fix from your side.
- **Display names travel in cleartext** in open-channel presence and typing signals.
- **IP addresses are visible to network peers**, as in any P2P system, and timing correlation is possible for a well-positioned observer. Today, pair Pombo with a VPN or Tor if your threat model includes network observers; a proxy-node layer built on Streamr Sponsorships is in development to address this at the protocol level.

## Shrinking what a seizure would find

A seized storage node yields ciphertext plus the metadata around it: stream identifiers, sizes, arrival times, and who fetched what. Two settings shrink that, and both belong to whoever owns the stream: point it at a **node you run**, and set **retention low**, which goes down to a single day.

For a channel, the owner sets both, and the cost is real: late joiners and second devices get only what is still retained.

For DMs it splits. Your inbox is yours to harden, and that covers what you receive. What you **sent** sits in the recipient's inbox, under their storage node and their retention, and nothing you do reaches it.

## Known open problems

- **DM spam.** Inboxes are public-write by design, so anyone can send to anyone — including spam that consumes inbox storage. Rate-limiting mechanisms were evaluated and rejected as ineffective at this layer; a better answer is an open research question.
- **Moderation in open channels is advisory.** Accounts are free, so bans in open and protected channels are one click to evade. Enforceable moderation exists only in contract-backed channels.
- **Revocation lags by up to a rotation.** Losing access — selling the gate asset, letting a subscription expire, being banned — stops at the contract immediately, but reading stops only when the channel's encryption key next rotates (weekly, and only while the channel's admin is online). A determined ex-member reads new messages until then. Shrinking that window means rotating more often, which costs every member a re-distribution; the current setting is a deliberate trade.
- **Unaudited contracts in the access path.** See the trusted-components table above.
- **Push anonymity scales with the user base.** The k in k-anonymity is roughly (users ÷ 256); a small network means small anonymity sets.
- **No key rotation for a compromised account.** Identity *is* the keypair. If your key leaks, the account is the attacker's too; there is no revocation. Migrate to a new account.