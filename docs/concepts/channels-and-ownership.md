---
id: channels-and-ownership
title: Channels and ownership
description: Channel types, on-chain ownership, retention, moderation and discovery.
---

# Channels and ownership

## Channel types

| | Public | Password | On-chain (native) |
|---|---|---|---|
| Read access | Everyone | Password holders | Authorized addresses |
| Write access | Everyone | Password holders | Authorized addresses |
| Access enforced by | — (open by design) | Client-side encryption | On-chain Streamr permissions |
| Content on the wire | Signed plaintext (Pombo format) | AES-256-GCM ciphertext | Streamr-encrypted |
| Cost to join | Free | Free | Free (owner pays gas to add you) |

- **Public channels** are open rooms. Anyone can read and write.
- **Password channels** look public to the network, but every message is encrypted client-side with AES-256-GCM using a key derived from the shared password (PBKDF2, 310,000 iterations). Without the password, the network carries only ciphertext.
- **Native channels** enforce membership *on-chain*: the owner grants publish/subscribe permission to specific Ethereum addresses in the Streamr registry on Polygon. This is the only channel type where access control is cryptographically and economically enforceable.

:::note Roadmap
Token-gated channels (hold an NFT / token balance / pay a subscription to enter) are designed but **not yet implemented**.
:::

## Ownership

The channel's stream ID literally contains the creator's address: `{ownerAddress}/{id}`. Ownership and permissions are entries in the Streamr registry contracts on Polygon PoS — public blockchain state that no third party, including Pombo, can alter or confiscate.

Two consequences worth understanding:

- **Your channels survive Pombo.** Any client that speaks the protocol can read them.
- **Creating a channel is public.** The creator's address is permanently visible in the channel ID. If you don't want a channel linked to your main identity, create it from a separate account.

## Retention

Channel owners choose how long storage nodes keep message history (default: **180 days**). Older messages age out of storage; the live network never held them anyway.

## Moderation

Owners moderate through the channel's admin stream: **ban members, hide messages, pin messages**. Clients apply this state when rendering.

:::caution Honest limits
In **public and password channels**, moderation is *cosmetic*: compliant clients hide banned users' messages, but since accounts are free and instant, a banned user can return with a new address in one click — and the messages still exist on the network for non-compliant clients. Bans are only truly enforceable in **native channels**, where writing requires an on-chain permission the owner can revoke.

Also note: ban lists are technically public (the admin stream is world-readable).
:::

## Discovery and curation

The **Explore** view lists public channels. The Pombo interface applies a curation manifest — a list of pinned channels and channels hidden *from discovery*. Hiding is interface-level only: a hidden channel still exists on the network and remains reachable by direct link. This reflects Pombo's design split: the *protocol* is neutral and uncensorable; the *interface* curates what it presents.
