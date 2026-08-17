---
id: channels-and-ownership
title: Channels and ownership
description: Channel types, on-chain ownership, retention, moderation and discovery.
---

# Channels and ownership

## Channel types

| | Public | Password | Closed |
|---|---|---|---|
| Read access | Everyone | Password holders | Authorized addresses |
| Write access | Everyone | Password holders | Authorized addresses |
| Access enforced by | — (open by design) | Client-side encryption | On-chain Streamr permissions |
| Content on the wire | Signed plaintext (Pombo format) | AES-256-GCM ciphertext | Streamr group-key encrypted |
| Cost to join | Free | Free | Free (owner pays gas to add you) |

- **Public channels** are open rooms. Anyone can read and write.
- **Password channels** look public to the network, but every message is encrypted client-side with AES-256-GCM using a key derived from the shared password (PBKDF2, 310,000 iterations). Without the password, the network carries only ciphertext. One caveat: each password channel publishes a verification challenge that anyone can fetch and test guesses against offline — so the channel is exactly as secret as the password is strong.
- **Closed channels** enforce membership *on-chain*: the owner grants publish/subscribe permission to specific Ethereum addresses in the Streamr registry on Polygon. This is the only channel type where access control is enforceable at the protocol level, and content is encrypted with Streamr's group keys, obtainable only by permissioned members. The trade-off: members publish under their real address — which a closed channel already exposes on-chain (see [Encryption](encryption.md)).
- A channel can also be created **read-only** (announcement style): everyone can read, only the owner posts.

:::note[Roadmap]
Token-gated channels (hold an NFT / token balance / pay a subscription to enter) are designed but **not yet implemented**.
:::

## Ownership

The channel's stream ID literally contains the creator's address: `{ownerAddress}/{id}`. Ownership and permissions are entries in the Streamr registry contracts on Polygon PoS — public blockchain state that no third party, including Pombo, can alter or confiscate.

Two consequences worth understanding:

- **Your channels survive Pombo.** Any client that speaks the protocol can read them.
- **Creating a channel is public.** The creator's address is permanently visible in the channel ID. If you don't want a channel linked to your main identity, create it from a separate account.

## Retention

Channel owners choose how long storage nodes keep message history (1–365 days, default **180**; changeable later in channel settings). Older messages age out of storage; the live network never held them anyway.

## Moderation

Owners moderate through the channel's admin stream: **ban members, hide messages, pin messages**. Clients apply this state when rendering.

:::caution[Honest limits]
In **public and password channels**, moderation is *cosmetic*: compliant clients hide banned users' messages, but since accounts are free and instant, a banned user can return with a new address in one click — and the messages still exist on the network for non-compliant clients. Bans are only truly enforceable in **closed channels**, where writing requires an on-chain permission the owner can revoke.

Also note: in public channels the ban list is world-readable, and in closed channels a ban does not by itself revoke the member's on-chain permission — revoking membership is a separate owner action.
:::

## Discovery and curation

The **Explore** view lists channels that opted into discovery: listing is a choice at creation time, channels are **unlisted by default**, and closed channels are never listed. An unlisted channel publishes no name or description on-chain — only the owner address and creation time are visible. On top of that, the Pombo interface applies a curation manifest — a list of pinned channels and channels hidden *from discovery*. Hiding is interface-level only: a hidden channel still exists on the network and remains reachable by direct link. This reflects Pombo's design split: the *protocol* is neutral and uncensorable; the *interface* curates what it presents.
