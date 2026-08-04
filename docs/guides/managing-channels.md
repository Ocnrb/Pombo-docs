---
id: managing-channels
title: Managing channels
description: Create a channel, choose its type and retention, manage members and moderate.
---

# Managing channels

## Creating a channel

Creating a channel registers its streams on Polygon PoS — the one action in Pombo that costs a network fee (a few cents' worth of POL). You'll choose:

- **Type** — public, password-protected, or on-chain (native). Pick based on who should get in; the trade-offs are explained in [Channels and ownership](../concepts/channels-and-ownership.md).
- **Retention** — how long storage keeps history (default 180 days).
- **Storage node** — the default Pombo cluster, or a custom storage node you specify (must be an HTTPS-reachable Streamr storage node).

The channel is owned by the account that creates it. Ownership is on-chain and cannot be transferred away from you by anyone.

## Managing members (native channels)

In a native channel, you control access by **granting and revoking on-chain permissions** to Ethereum addresses. Each grant/revoke is a Polygon transaction paid by you (the owner). Members join and chat for free.

This is the channel type to use when a ban has to actually stick: revoking a member's permission removes their ability to publish at the protocol level, not just cosmetically.

## Moderation tools

As owner, you can:

- **Ban members** — their messages stop being displayed by clients.
- **Hide individual messages.**
- **Pin messages.**

Moderation state is published on the channel's admin stream, which only you can write to.

:::caution
In public and password channels, remember that bans are advisory: a determined user can rejoin with a fresh account, and the underlying messages remain on the network. For enforceable access control, use a native channel. See [the honest limits](../concepts/channels-and-ownership.md#moderation).
:::

## Inviting people

- **Share the channel link** — anyone opening it lands in the channel (for password channels, they'll also need the password; share it through a secure path such as a Pombo DM).
- **In-app invites** — sent through the recipient's DM inbox, end-to-end encrypted like any DM.
