---
id: channel-anatomy
title: Anatomy of channels
description: The streams behind every channel and DM inbox — what each carries, what is stored, and where encryption applies.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Anatomy of channels

Every channel is a set of Streamr streams under the creator's address — three for open and protected channels, four when membership is contract-backed:

| Stream | Stored? | Partitions | Purpose |
|---|---|---|---|
| `…-1` Message stream | Yes | 11 | Chat content (P0), edit/delete control messages (P1), file chunks (P2–P10) |
| `…-2` Ephemeral stream | No | 3 | Presence and typing (P0), live P2P media signals (P1) and data (P2) |
| `…-3` Admin stream | Yes | 3 | Moderation state (P0), channel image (P1), password challenge (P2) — writable only by the owner |
| `…-4` Keys stream | Yes | 1 | Distribution of the channel's encryption keys — closed, gated and paid channels only |

The stream ID itself has the form `{ownerAddress}/{id}`, which is what makes ownership self-evident: the creator's address is part of the channel's name. What that ownership means in practice is the subject of [Channel access](channel-access.md) and [Ownership and moderation](ownership-and-moderation.md).

The keys stream is stored on purpose: it is what makes joining a private channel asynchronous. A newcomer's key request waits there until some member comes online to answer it, instead of both having to be connected at the same moment. See [Encryption](encryption.md#closed-gated-and-paid-channels).

The full picture per channel type — on-chain metadata, permissions, partitions, and where encryption applies (click to zoom):

<Tabs>
<TabItem value="open" label="Open channel">

![Open channel — multiple stream architecture: three streams with their on-chain metadata, permissions and partition layout](../assets/diagrams/open-channel.webp)

*Content flows unencrypted; the four metadata variants cover visible/hidden and read-only combinations.*

</TabItem>
<TabItem value="protected" label="Protected channel">

![Protected channel — multiple stream architecture: identical stream layout, with every partition encrypted by a key derived from the shared password](../assets/diagrams/protected-channel.webp)

*Same layout as an open channel, but every partition's content passes through AES-256-GCM with a PBKDF2-derived key (green path); the admin stream gains the password-challenge partition.*

</TabItem>
<TabItem value="native" label="Closed, gated and paid channels">

Diagram coming soon — contract-backed channels add the keys stream to the layout above. Every stream's permission is held by one grantee, the channel's membership contract, and content is encrypted under a channel key distributed over `…-4`. See [The membership contract](channel-access.md#the-membership-contract).

</TabItem>
</Tabs>

## Direct messages: the mailbox model

Each user has a personal **DM inbox** — a deterministic pair of streams derived from their address: a stored message stream (13 partitions: messages, sync, notifications, file chunks) and an ephemeral one for presence and typing. Its permissions are the inverse of a normal channel: **anyone can publish** into it, but **only the owner can subscribe** (read). The inbox metadata also carries the owner's encryption public key, which is what lets anyone seal a message to them.

Sending a DM means encrypting a message for the recipient and dropping it into their inbox. Because the inbox is backed by a storage node, the recipient doesn't need to be online — they pull their inbox history when they next open the app. This is what makes Pombo's DMs asynchronous, like a phone's SMS inbox, rather than requiring both parties online.

The inbox also doubles as your personal [cross-device sync](storage-and-sync.md#cross-device-sync) channel.

![DM inbox — dual stream architecture: a stored inbox stream and an ephemeral stream, with ECDH-derived AES-256-GCM encryption on every partition](../assets/diagrams/dm-inbox.webp)

*The inbox publishes the owner's encryption public key as on-chain metadata (green); every partition — messages, sync, notifications, file chunks — is sealed with a key derived via ECDH + HKDF before it touches the network.*
