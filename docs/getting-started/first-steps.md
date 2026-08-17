---
id: first-steps
title: First steps
description: Join a channel, send your first message, and DM someone.
---

# First steps

## Join a channel

Channels are Pombo's group spaces. You can find them two ways:

- **Explore** — the in-app discovery view listing public channels.
- **Direct link** — any channel can be shared as a URL. Opening the link takes you straight there. Try the official Pombo channel: [app.pombo.cc/#/channel/…](https://app.pombo.cc/#/channel/0xae340e799e8151f6a4999d245e466197aa217667/9862eb7bd898f338-1)

Joining and chatting is always free — no gas, no fees.

There are three kinds of channels; the app shows which is which:

| Type | Who can read | Who can write |
|---|---|---|
| **Public** | Everyone | Everyone |
| **Password** | Anyone with the shared password | Anyone with the password |
| **Closed** | Members authorized by Ethereum address | Authorized members |

More detail in [Channels and ownership](../concepts/channels-and-ownership.md).

## Send a message

Type and send — messages propagate peer-to-peer over the Streamr Network and are persisted by storage nodes so people who join later (or come back online) can read the history. Reactions, edits, deletes, and replies work as you'd expect.

## Direct messages

You can DM **anyone who has created their inbox** — enter their address (or ENS name) and write. They don't need to be online, and you don't need to be "friends" first. The one requirement is that the recipient has set up their DM inbox — an explicit one-time step (it registers streams on-chain, so it costs a small POL fee). The same applies to you: create your inbox to receive DMs and replies.

DMs are end-to-end encrypted with sealed sender: only the recipient can read the message, and only the recipient learns who sent it. See [Encryption](../concepts/encryption.md).

## Create your own channel

Creating a channel registers streams on Polygon PoS, which costs a small network fee in POL — one of the handful of on-chain actions that do (the [FAQ](../help/faq.md#is-pombo-free) has the full list). See [Managing channels](../guides/managing-channels.md).

## Before you go further

:::tip
Two minutes now saves your account later: [export a backup](../guides/backup-and-recovery.md). There is no account recovery without it.
:::
