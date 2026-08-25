---
id: welcome
title: What is Pombo?
slug: /
description: "Pombo is an open-source, permissionless messaging and social media app: peer-to-peer, with no accounts to approve, no server that can read your messages, and channels whose creators keep everything they charge."
---

# What is Pombo?

**Pombo is an open-source, peer-to-peer (p2p) messaging and social media app**: group channels and private direct messages, running without a company in the middle of any of it.

What follows is a consequence of how it is built, not a policy anyone maintains.

## Nobody has to let you in

Your account is a cryptographic keypair generated on your device the first time you open the app. There is no email, no phone number, no form, and no approval step. Because no record of you is created anywhere, there is no account to suspend, rate-limit or lock out.

Creating a channel is the same: you register it and it is yours. It becomes your property. Accounts are free and instant, so keeping separate identities for separate parts of your life costs nothing.

## Anyone can run the infrastructure

Messages travel peer-to-peer across the [Streamr Network](https://streamr.network). No server sits between you and the person you are talking to, and the infrastructure that carries and keeps your messages only ever handles ciphertext.

History is kept by storage nodes. Pombo runs a default cluster, but a channel's owner can point it at a different node, and [anyone can run one](operators/run-a-storage-node.md). The same is true of the [relay](operators/run-a-relay.md) that delivers push notifications.

## Your channels outlive the app

Channel ownership and access rules are records on [Polygon PoS](https://polygon.technology), registered to your address. Nobody, Pombo included, can take a channel from you or change who may read it.

That also makes this interface replaceable. Any client speaking the same protocol reads the same channels, so if Pombo disappeared tomorrow, what you built would still be on the network.

## Encrypted before it leaves your device

All cryptography runs locally, on web and Android alike, before anything is published. Direct messages are end-to-end encrypted and sealed, so only the recipient learns who wrote. In open and protected channels you publish under a throwaway key rather than your account, so the network sees traffic, not a person.

None of that is absolute, and the [threat model](security/threat-model.md) says exactly where it stops.

## Creators keep the whole price

A channel can charge for entry: a token or NFT to hold, or a subscription at a price and period its owner sets. Each subscription goes straight to the owner. No fee, no revenue share, no Pombo account in between. The payment function is a single transfer to the owner's address, and anyone can read it.

Everything else is free. Joining an open channel, chatting, DMs and file sharing cost nothing, and Pombo has no premium tier and no ads. Actions that write to the blockchain, such as creating a channel, cost a few cents in POL paid to the network.

## Where to start

| | |
|---|---|
| **Try it** | [Install Pombo](getting-started/install.md), then [first steps](getting-started/first-steps.md) |
| **Run a channel** | [Managing channels](guides/managing-channels.md) · [Channel access](concepts/channel-access.md) |
| **Understand it** | [Client](concepts/client.md) · [Encryption](concepts/encryption.md) · [Privacy model](concepts/privacy-model.md) |
| **Check our claims** | [Privacy at a glance](security/privacy-at-a-glance.md) · [Threat model](security/threat-model.md) |
| **Run infrastructure** | [Push relay](operators/run-a-relay.md) · [Storage node](operators/run-a-storage-node.md) |

## Platforms

- **Web (PWA)** at [app.pombo.cc](https://app.pombo.cc), installable from any modern browser.
- **Android**, a native app speaking the same protocol, so the two interoperate exactly.

## Links

- Website: [pombo.cc](https://pombo.cc)
- App: [app.pombo.cc](https://app.pombo.cc)
- Source code: [github.com/Pombo-app/Pombo](https://github.com/Pombo-app/Pombo)
- X: [@app_Pombo](https://x.com/app_Pombo)
