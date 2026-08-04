---
id: architecture
title: Architecture
description: How Pombo works without servers — Streamr transport, Polygon permissions, storage nodes, client-side crypto.
---

# Architecture

Pombo has no backend. It is a client that composes three decentralized layers:

```
┌─────────────────────────────────────────────┐
│  Pombo client (browser PWA / Android app)   │
│  identity · encryption · UI                 │
├─────────────────────────────────────────────┤
│  Streamr Network      →  message transport  │
│  (P2P pub/sub)           & delivery         │
├─────────────────────────────────────────────┤
│  Storage nodes        →  message history    │
│  (Streamr + Cassandra)   & offline delivery │
├─────────────────────────────────────────────┤
│  Polygon PoS          →  ownership &        │
│  (Streamr registries)    permissions        │
└─────────────────────────────────────────────┘
```

- **Transport — Streamr Network.** Messages are published to *streams* (topics) and propagate peer-to-peer between subscribers. No relay server sits in the middle of your conversations.
- **Ownership — Polygon PoS.** Streams are registered on-chain in the Streamr registry contracts. The record of who owns a channel and who may publish or subscribe to it is public blockchain state — not a row in someone's database. On-chain writes (creating a channel, granting membership) cost a small fee in POL; everything else is free.
- **Persistence — storage nodes.** Streamr nodes running the storage plugin retain stream history, so messages reach people who were offline. Channel owners choose the storage node and the retention period. See [Storage and persistence](storage-and-persistence.md).
- **Cryptography — your device.** Keys are generated and used locally. DM encryption, password-channel encryption and message signing all happen client-side before anything is published.

## Anatomy of a channel

Every channel is a set of **three Streamr streams** under the creator's address:

| Stream | Stored? | Purpose |
|---|---|---|
| `…-1` Message stream | Yes | Chat content, edit/delete control messages, file chunks |
| `…-2` Ephemeral stream | No | Presence, typing indicators, live P2P media transfer |
| `…-3` Admin stream | Yes | Moderation state (bans, hidden messages, pins) — writable only by the owner |

The stream ID itself has the form `{ownerAddress}/{id}`, which is what makes ownership self-evident: the creator's address is part of the channel's name.

## Direct messages: the mailbox model

Each user has a personal **DM inbox** — a deterministic stream derived from their address. Its permissions are the inverse of a normal channel: **anyone can publish** into it, but **only the owner can subscribe** (read).

Sending a DM means encrypting a message for the recipient and dropping it into their inbox. Because the inbox is backed by a storage node, the recipient doesn't need to be online — they pull their inbox history when they next open the app. This is what makes Pombo's DMs asynchronous, like a phone's SMS inbox, rather than requiring both parties online.

Your own inbox also doubles as your **cross-device sync channel**: the app writes self-encrypted state snapshots to it, so a second device logged into the same account converges to the same contacts, channels and settings.

## The interface is replaceable

Pombo (the app at app.pombo.cc) is *an* interface to this protocol, not *the* system. All of the state — identities, channels, permissions, history — lives on public networks. Anyone can build another client against the same streams, and if the Pombo interface vanished, the protocol and your data would remain.
