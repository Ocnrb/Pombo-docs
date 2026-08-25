---
id: ownership-and-moderation
title: Ownership and moderation
description: On-chain ownership, what a ban is worth in each access model, and how discovery and curation work.
---

# Ownership and moderation

## Ownership

The channel's stream ID literally contains the creator's address: `{ownerAddress}/{id}`. Ownership and permissions are entries in the Streamr registry contracts on Polygon PoS — public blockchain state that no third party, including Pombo, can alter or confiscate.

Two consequences worth understanding:

- **Your channels survive Pombo.** Any client that speaks the protocol can read them.
- **Creating a channel is public.** The creator's address is permanently visible in the channel ID. If you don't want a channel linked to your main identity, create it from a separate account.

## Moderation

Owners moderate through the channel's admin stream, which only they can write to: **ban members, hide messages, pin messages**. Clients apply this state when rendering.

How much a ban is worth depends entirely on the channel's [access model](channel-access.md):

- In **open and protected channels**, moderation is *advisory*: compliant clients hide banned users' messages, but since accounts are free and instant, a banned user can return with a new address in one click — and the messages still exist on the network for non-compliant clients. In open channels the ban list itself is world-readable.
- In **contract-backed channels** (Closed, Gated, Paid), bans are the enforceable kind: the contract stops vouching for the address, and the network stops accepting its messages. This is the difference [that family](channel-access.md#the-membership-contract) exists for.

Even an enforceable ban cuts *future* access without unsigning what the member already published. Removing their history is a separate, explicit owner action, available only in Closed channels. And their ability to *read* ends at the channel's next key rotation, not the instant of the ban — see the [honest limits](channel-access.md#honest-limits).

In contract-backed channels the owner can also appoint **moderators**, who add, remove and ban members but cannot erase history, act on the owner or other moderators, or appoint anyone themselves.

## Discovery and curation

The **Explore** view lists channels that opted into discovery: listing is a choice at creation time, channels are **unlisted by default**, and closed channels are never listed. Gated and paid channels *can* be listed, as storefronts: the listing shows the channel's name, description, image and access marker — the condition or the price — so someone can see what they would be joining before acquiring anything, while the conversation itself stays encrypted; a shop window, not a preview. An unlisted channel publishes no name or description on-chain — only the owner address and creation time are visible. On top of that, the Pombo interface applies a curation manifest — a list of pinned channels and channels hidden *from discovery*. Hiding is interface-level only: a hidden channel still exists on the network and remains reachable by direct link. This reflects Pombo's design split: the *protocol* is neutral and uncensorable; the *interface* curates what it presents.
