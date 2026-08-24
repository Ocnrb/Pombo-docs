---
id: storage-and-persistence
title: Storage and persistence
description: How message history persists — storage nodes, retention, local encrypted storage, and cross-device sync.
---

# Storage and persistence

The Streamr Network delivers messages live; it does not remember them. Persistence comes from **storage nodes** — Streamr nodes that archive stream history and serve it back on request.

## Storage nodes

When a channel (or DM inbox) is created, its stored streams are assigned to one or more storage nodes (changeable later in settings), which archive messages for the configured retention period (default **180 days**, chosen by the owner). When you open a channel, Pombo fetches recent history from the storage node, then follows the live stream.

- **Default provider:** Pombo operates a storage cluster (two servers with a replicated Cassandra database behind a single node identity) that channels use out of the box.
- **Custom storage nodes:** channel owners can point a channel (or their own DM inbox) at any Streamr storage node instead. The node must be web-reachable: HTTPS with a real hostname, since browsers cannot fetch plain-HTTP or raw-IP endpoints. See [Run a storage node](../operators/run-a-storage-node.md).

What storage nodes hold is exactly what the network carried: ciphertext for protected channels, contract-backed channels and DMs, signed plaintext for open channels. Storage operators are infrastructure, not custodians — they cannot read encrypted content.

Closed, gated and paid channels store one thing more: their keys stream, which is what lets someone join and receive the channel's encryption key without another member being online at that exact moment.

## What lives on your device

Everything personal is local, and encrypted at rest:

- Your key and app state (contacts, channel list, settings, image ledger) are encrypted at rest and isolated per account — in the web app as a scrypt keystore plus AES-256-GCM-encrypted IndexedDB; on Android in the platform's encrypted storage under the Android Keystore.
- Channel messages are deliberately **not** cached locally — they are re-fetched from storage nodes each time you open a channel.
- Sent DMs are kept locally — a quirk of the mailbox model: your sent messages live in the *recipient's* inbox, so your own copy is your record of them.

## Cross-device sync

Your DM inbox doubles as a personal sync channel: the app periodically writes **self-encrypted snapshots** of your state to it. Log in on another device with the same account and it pulls those snapshots, merges them, and converges — contacts, channels, settings, sent messages (read state stays per-device). Only your key can decrypt them.

## Two file-sharing transports

Pombo moves files two different ways, with different persistence:

| | Mesh (live P2P) | Persistent (storage-based) |
|---|---|---|
| How | Swarm transfer between online peers | File chunked and archived on the storage node |
| Sender must be online? | Yes (someone must seed) | Only during upload |
| Lifetime | While seeded (a seeder's local copy is kept up to 7 days, in a 700 MB cache) | Channel's retention period |

See [File sharing](../guides/file-sharing.md) for details and limits.
