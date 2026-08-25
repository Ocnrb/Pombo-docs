---
id: first-steps
title: First steps
description: Join a channel, send your first message, and DM someone.
---

# First steps

## Join a channel

Channels are Pombo's group spaces. You can reach them three ways:

- **Explore**, the in-app discovery view, which lists the channels their owners chose to list.
- **A direct link**: any channel can be shared as a URL. Opening it takes you straight there. Try the official Pombo channel: [app.pombo.cc/#/channel/…](https://app.pombo.cc/#/channel/0xae340e799e8151f6a4999d245e466197aa217667/9862eb7bd898f338-1)
- **The channel ID**: paste it into **Join Channel**. Every channel has one, in the form `0x…/name`, and it works whether or not the channel is listed.

Channels are [unlisted by default](../concepts/ownership-and-moderation.md#discovery-and-curation), and an unlisted channel never appears in Explore. For those, a link or the channel ID is the only way in.

There are five kinds of channels; the app shows which is which:

| Type | Who can read | Who can write |
|---|---|---|
| **Open** | Everyone | Everyone |
| **Protected** | Anyone with the shared password | Anyone with the password |
| **Closed** | Addresses the owner allowlists | The same |
| **Gated** | Anyone holding the required token or NFT | The same |
| **Paid** | Anyone with an active subscription | The same |

More detail in [Channel access](../concepts/channel-access.md).

## Send a message

Type and send. Messages propagate peer-to-peer over the Streamr Network and are persisted by storage nodes so people who join later (or come back online) can read the history. Reactions, edits, deletes, and replies work as you'd expect.

## Direct messages

Start by creating your **DM inbox**. It is what lets you receive messages and replies, and what keeps your devices in sync. Setting it up registers streams on-chain, so it costs a small POL fee: once, and never again.

With that done, you can write to anyone who has an inbox of their own. Enter their address or ENS name and send. They don't need to be online, and there is no friend request to accept first.

DMs are end-to-end encrypted with sealed sender: only the recipient can read the message, and only the recipient learns who sent it. The full picture — the inbox, blocking, where messages live — is in [Direct messages](../guides/direct-messages.md).

## Create your own channel

Creating a channel registers streams on Polygon PoS, which costs a small network fee in POL, one of the handful of on-chain actions that do (the [FAQ](../help/faq.md#is-pombo-free) has the full list). See [Managing channels](../guides/managing-channels.md).

## Before you go further

:::tip
Two minutes now saves your account later: [export a backup](../guides/backup-and-recovery.md). There is no account recovery without it.
:::
