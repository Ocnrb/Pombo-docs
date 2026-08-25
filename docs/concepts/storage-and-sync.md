---
id: storage-and-sync
title: Storage & Sync
description: How history persists and devices converge — storage nodes, retention, local state, and self-encrypted sync.
---

# Storage & Sync

The Streamr Network delivers messages live; it does not remember them. Persistence comes from **storage nodes** — Streamr nodes that archive stream history and serve it back on request.

## Storage nodes

When a channel (or DM inbox) is created, its stored streams are assigned to one or more storage nodes (changeable later in settings). When you open a channel, Pombo fetches recent history from the storage node, then follows the live stream.

- **Default provider:** Pombo operates a storage cluster (two servers with a replicated Cassandra database behind a single node identity) that channels use out of the box.
- **Custom storage nodes:** channel owners can point a channel (or their own DM inbox) at any Streamr storage node instead. The node must be web-reachable: HTTPS with a real hostname, since browsers cannot fetch plain-HTTP or raw-IP endpoints. See [Run a storage node](../operators/run-a-storage-node.md).

What storage nodes hold is exactly what the network carried: ciphertext for protected channels, contract-backed channels and DMs, signed plaintext for open channels. Storage operators are infrastructure, not custodians — they cannot read encrypted content.

Reading is a direct HTTPS request from your device to the node, so whoever runs it sees which channels you open and when. Choosing a node is choosing who gets that.

## Retention

Channel owners choose how long storage nodes keep message history (1–365 days, default **180**; changeable later in channel settings). Older messages age out of storage; the live network never held them anyway. A DM inbox has the same setting, chosen by its owner — the [threat model](../security/threat-model.md#shrinking-what-a-seizure-would-find) covers retention as a privacy lever.

## What lives on your device

Everything personal starts local, and is encrypted at rest. With a DM inbox it also travels, sealed to your own key, so your other devices can read it — see [Cross-device sync](#cross-device-sync) below.

- Your key and app state (contacts, channel list, settings, image ledger) are encrypted at rest and isolated per account — in the web app as a scrypt keystore plus AES-256-GCM-encrypted IndexedDB; on Android in the platform's encrypted storage under the Android Keystore. Detail in [Encryption](encryption.md#what-is-protected-locally).
- Channel messages are deliberately **not** cached locally — they are re-fetched from storage nodes each time you open a channel.
- Sent DMs are kept locally — a quirk of the mailbox model: your sent messages live in the *recipient's* inbox, so your own copy is your record of them.

## Cross-device sync

Your DM inbox doubles as a personal sync channel: the app periodically writes **self-encrypted snapshots** of your state to it. Log in on another device with the same account and it pulls those snapshots, merges them, and converges — contacts, channels, settings, sent messages (read state stays per-device). Only your key can decrypt them, and any payload not authored by your own wallet is rejected.

## Files travel two ways

Pombo moves files either through the storage node (chunked, archived, downloadable for the retention period) or over a live P2P mesh between online peers (nothing archived, someone must seed). You choose per file when sending — [File sharing](../guides/file-sharing.md) has the comparison and limits.
