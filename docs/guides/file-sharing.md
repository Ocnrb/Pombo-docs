---
id: file-sharing
title: File sharing
description: Pombo's two file transports — live P2P mesh and persistent storage-based sharing.
---

# File sharing

Pombo can move files two ways, and **you choose which** when sending. Knowing the difference helps you pick the right one.

## Persistent sharing (via storage nodes)

For files that should outlive the moment: the sender's client splits the file into small chunks, publishes them to the channel's stored stream across several partitions, verifies they were archived, and then posts the file announcement into the chat.

- **Receivers can download any time** within the channel's retention period — the sender can go offline immediately after upload.
- Chunks are small (~240 KB) because that's the practical per-message limit for browser-to-network transport; large files simply mean many chunks.
- In **DMs**, file content is sealed end-to-end like everything else: a fresh ephemeral key per transfer, readable only by the recipient.

## Mesh sharing (live P2P)

For live transfer between online peers: a pull-based swarm over the channel's ephemeral (unstored) stream, similar in spirit to BitTorrent — receivers request pieces, and anyone who has pieces can serve them.

- **Requires at least one online seeder.** If everyone with the file goes offline, the transfer can't complete.
- Individual files are capped at 500 MB; seeded files are kept for re-serving for up to 7 days, in a local seed cache capped at 700 MB.
- Nothing is written to storage nodes — the transfer leaves no archived trace.

## Files in private channels

In closed, gated and paid channels, both transports are sealed with the channel's encryption key — the same one that protects messages — so storage nodes and the network carry ciphertext either way.

One consequence to expect: because those keys rotate, **a member who joins after a rotation cannot open files shared before it**, exactly as they cannot read the messages from that period. In a paid channel that is the rule rather than an edge case — a subscription buys the future. See [Encryption](../concepts/encryption.md#closed-gated-and-paid-channels).

## Managing transfers

Downloads in progress live in the notification bell. Completed ones save automatically. While a transfer runs you can **pause and resume** it — both transports — and storage downloads can also be **cancelled**, which discards what was fetched (a pause keeps it). When you finish seeding a file, the bytes stay as an inactive record you can re-seed later; deleting them is a separate, explicit action.

## Which is which?

| You want to… | Transport |
|---|---|
| Post a file to a channel for people to grab later | Persistent |
| Send an image in a DM | Persistent (sealed) |
| Push something big to people who are online right now | Mesh |
