---
id: managing-channels
title: Managing channels
description: Create a channel, choose its type and retention, manage members and moderate.
---

# Managing channels

## Creating a channel

Creating a channel registers its streams on Polygon PoS, which costs a network fee (a few cents' worth of POL — the app estimates the cost and checks your balance before starting). You'll choose:

- **Type**: open, protected, closed, gated or paid. Pick based on who should get in; the trade-offs are explained in [Channel access](../concepts/channel-access.md). Any type can also be made **read-only** (only you post). The last three deploy a membership contract as part of creation, which adds one transaction to the cost — see [The membership contract](../concepts/channel-access.md#the-membership-contract).
- **Visibility** — whether the channel is listed in Explore. Channels are unlisted by default; listed channels also carry a description, language and category.
- **Retention** — how long storage keeps history (1–365 days, default 180).
- **Storage node** — the default Pombo cluster, or a custom storage node identified by its Ethereum address (the app verifies on-chain that the node publishes an HTTPS endpoint browsers can reach).

Retention and storage nodes can be changed later in channel settings (each change is an on-chain transaction).

The channel is owned by the account that creates it. Ownership is on-chain and cannot be transferred away from you by anyone.

## Managing members (closed channels)

In a closed channel, you control access by **adding and removing Ethereum addresses** in the channel's membership contract. Each change is a Polygon transaction paid by you (the owner); adding several people at once is a single transaction. Members join and chat for free.

This is the channel type to use when a ban has to actually stick: once you remove someone, the network itself refuses their messages. Two things to know before relying on it — what they already published stays published unless you also erase it, and their ability to *read* ends at the channel's next key rotation, not the instant you remove them. Both are explained in [Channel access](../concepts/channel-access.md#the-membership-contract).

In gated and paid channels there is no member list to manage: the contract's rule — holding the asset, or an active subscription — decides. What you manage there is bans and, if you want the help, moderators.

## Moderation tools

As owner, you can:

- **Ban members** — their messages stop being displayed by clients, and in contract-backed channels they lose access outright.
- **Hide individual messages.**
- **Pin messages.**
- **Appoint moderators** (contract-backed channels) — they manage membership and bans, but cannot erase history, act on you or other moderators, or appoint anyone themselves.

Moderation state is published on the channel's admin stream, which only you can write to.

:::caution
In open and protected channels, remember that bans are advisory: a determined user can rejoin with a fresh account, and the underlying messages remain on the network. For enforceable access control, use a contract-backed channel. See [Moderation](../concepts/ownership-and-moderation.md#moderation).
:::

## Inviting people

- **Share the channel link** — anyone opening it lands in the channel (for protected channels, they'll also need the password; share it through a secure path such as a Pombo DM).
- **In-app invites** — sent through the recipient's DM inbox, end-to-end encrypted like any DM.
