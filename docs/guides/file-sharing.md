---
id: file-sharing
title: File sharing
description: Pombo's two file transports — live P2P mesh and persistent storage-based sharing.
---

# File sharing

Pombo can move files two ways. The app picks the appropriate one, but knowing the difference explains what to expect.

## Persistent sharing (via storage nodes)

For files that should outlive the moment: the sender's client splits the file into small chunks, publishes them to the channel's stored stream across several partitions, verifies they were archived, and then posts the file announcement into the chat.

- **Receivers can download any time** within the channel's retention period — the sender can go offline immediately after upload.
- Chunks are small (~240 KB) because that's the practical per-message limit for browser-to-network transport; large files simply mean many chunks.
- In **DMs**, file content is sealed end-to-end like everything else: a fresh ephemeral key per transfer, readable only by the recipient.

## Mesh sharing (live P2P)

For live transfer between online peers: a pull-based swarm over the channel's ephemeral (unstored) stream, similar in spirit to BitTorrent — receivers request pieces, and anyone who has pieces can serve them.

- **Requires at least one online seeder.** If everyone with the file goes offline, the transfer can't complete.
- Seeded files are kept for re-serving for up to 7 days; per-session upload is capped at 500 MB.
- Nothing is written to storage nodes — the transfer leaves no archived trace.

## Which is which?

| You want to… | Transport |
|---|---|
| Post a file to a channel for people to grab later | Persistent |
| Send an image in a DM | Persistent (sealed) |
| Push something big to people who are online right now | Mesh |
