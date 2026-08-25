---
id: direct-messages
title: Direct messages
description: Set up your DM inbox, message anyone, and know what a public mailbox does and doesn't mean.
---

# Direct messages

DMs in Pombo travel live, peer-to-peer, when you're both online — and behind every conversation sits a mailbox: each message also lands in the recipient's inbox, where it waits if they're away. Neither of you ever needs to be online at the same time.

## Set up your inbox

To *receive* DMs you need a **DM inbox** of your own. Creating it registers streams on-chain, which costs a small POL fee — once, and never again. The inbox is more than a mailbox: it is also where channel invites arrive, and it is what [keeps your devices in sync](../concepts/storage-and-sync.md#cross-device-sync).

Two things to know before creating it:

- **Sync starts with it.** Once the inbox exists, Pombo automatically publishes self-encrypted snapshots of your state to it — contacts, channels, settings — so a second device can converge. Only your key can read them, and you can set sync to manual in Settings.
- **Guest mode has no inbox**, so guests can't receive DMs or sync devices.

## Send a message

Enter the recipient's address or ENS name and write. They don't need to be online, and there is no friend request to accept first — anyone with an inbox can be written to. Images and files ride along, sealed the same way as the text.

What protects a DM: end-to-end encryption with **sealed sender** — only the recipient can read the message, and only the recipient learns who sent it; the network sees ciphertext from a throwaway address. The mechanics, and the one trade-off worth knowing (there is no forward secrecy in DMs), are in [Encryption](../concepts/encryption.md#direct-messages-end-to-end-sealed-sender).

## Living with a public mailbox

Your inbox is **public-write by design** — that is what lets a stranger answer your channel post or accept your invite without a handshake. The honest consequence is that anyone can write to you, including people you'd rather not hear from, and there is no server-side filter to change that.

What you *can* do is **block a peer**: your clients stop showing you anything from them, and the block list syncs across your devices. Blocking is client-side — it hides, it cannot stop a deposit from arriving at a public mailbox. The wider spam question is an [open problem](../security/threat-model.md#known-open-problems) the threat model states plainly.

## Where your messages live

The mailbox model has one asymmetry worth understanding:

- **What you receive** sits in *your* inbox, under the storage node and [retention period](../concepts/storage-and-sync.md#retention) you set.
- **What you send** sits in the *recipient's* inbox, under their node and their retention — which is why your own device keeps a local copy of your sent messages: it is your only record of them.

History you receive re-downloads from storage on any device; if privacy matters more than convenience, a short retention on your inbox shrinks what it holds — the [threat model](../security/threat-model.md#shrinking-what-a-seizure-would-find) covers that trade.
