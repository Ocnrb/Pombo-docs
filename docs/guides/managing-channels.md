---
id: managing-channels
title: Managing channels
description: Create a channel, choose its type and retention, manage members and moderate.
---

# Managing channels

## Creating a channel

Creating a channel registers its streams on Polygon PoS, which costs a network fee (a few cents' worth of POL — the app estimates the cost and checks your balance before starting). You'll choose:

- **Type** — public, password-protected, or closed. Pick based on who should get in; the trade-offs are explained in [Channels and ownership](../concepts/channels-and-ownership.md). Any type can also be made **read-only** (only you post).
- **Visibility** — whether the channel is listed in Explore. Channels are unlisted by default; listed channels also carry a description, language and category.
- **Retention** — how long storage keeps history (1–365 days, default 180).
- **Storage node** — the default Pombo cluster, or a custom storage node identified by its Ethereum address (the app verifies on-chain that the node publishes an HTTPS endpoint browsers can reach).

Retention and storage nodes can be changed later in channel settings (each change is an on-chain transaction).

The channel is owned by the account that creates it. Ownership is on-chain and cannot be transferred away from you by anyone.

## Managing members (closed channels)

In a closed channel, you control access by **granting and revoking on-chain permissions** to Ethereum addresses. Each grant/revoke is a Polygon transaction paid by you (the owner). Members join and chat for free.

This is the channel type to use when a ban has to actually stick: revoking a member's permission removes their ability to publish at the protocol level, not just cosmetically.

## Moderation tools

As owner, you can:

- **Ban members** — their messages stop being displayed by clients.
- **Hide individual messages.**
- **Pin messages.**

Moderation state is published on the channel's admin stream, which only you can write to.

:::caution
In public and password channels, remember that bans are advisory: a determined user can rejoin with a fresh account, and the underlying messages remain on the network. For enforceable access control, use a closed channel. See [the honest limits](../concepts/channels-and-ownership.md#moderation).
:::

## Inviting people

- **Share the channel link** — anyone opening it lands in the channel (for password channels, they'll also need the password; share it through a secure path such as a Pombo DM).
- **In-app invites** — sent through the recipient's DM inbox, end-to-end encrypted like any DM.
