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

What storage nodes hold is exactly what the network carried: ciphertext for password channels and DMs, signed plaintext for public channels. Storage operators are infrastructure, not custodians — they cannot read encrypted content.

## What lives on your device

Everything personal is local, and encrypted at rest:

- Your key lives in browser storage as a self-encrypted keystore (scrypt); app state (contacts, channel list, settings) and an image ledger live in IndexedDB, encrypted with AES-256-GCM and isolated per account.
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
