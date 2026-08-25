---
id: faq
title: FAQ
description: Frequently asked questions about Pombo.
---

# FAQ

### Is Pombo free?

Pombo itself has no ads, no premium tier and no cut of anything. Chatting, DMs and file sharing are free; the costs are small Polygon network fees (paid in POL, typically cents) for **on-chain actions**: creating a channel, the one-time creation of your personal DM inbox (needed to *receive* DMs and to sync devices), managing members in a closed channel, and changing an existing channel's retention or storage nodes.

Two things a channel's *creator* can charge for, if they choose: a **gated** channel asks you to hold a token or NFT, and a **paid** channel asks for a subscription. That money goes to the channel owner — the contract takes no fee and Pombo is not a party to it. Everything else stays free, and if you only join open channels and chat, you pay nothing.

### Can Pombo (the developers) read my messages?

No — and not as a promise, but structurally. There is no server where messages pass in the clear: DMs and protected channels are encrypted on your device, and the infrastructure (Streamr nodes, storage nodes) only ever handles ciphertext. Open channels are readable by everyone *including* us, because they're public.

### What happens if pombo.cc disappears?

Your channels, messages, and identity live on the Streamr Network and Polygon — not on Pombo's website. The app is open source; any client implementing the protocol can access the same data. The interface is replaceable; your data outlives it.

### Do I need a crypto wallet or tokens to use Pombo?

No. Pombo generates its own keypair for you — no MetaMask, no seed phrase ceremony, no purchase. You only need a few cents of POL for on-chain actions such as creating a channel or the one-time setup of your DM inbox (and, if you want into a gated or paid channel, whatever asset that channel's owner asks for). You can also import an existing Ethereum private key if you want your established identity.

### Are there group chats?

Group conversation in Pombo is a **channel**. There is no separate "group DM" primitive — a private group is a password or closed channel.

### Someone I banned came back with a new account. Why?

Because accounts are free and unlinked, a ban in an open or protected channel can't stop a determined user — this is a structural property of permissionless systems, and Pombo is honest about it rather than pretending otherwise. If you need enforceable access control, use a **closed, gated or paid channel**, where membership is contract state you control and the network refuses messages from anyone the contract won't vouch for.

### Is Pombo anonymous?

Pombo is **pseudonymous with strong wire privacy**, not an anonymity network. Your real account is hidden from network observers, but open channel participation is publicly attributable to your account, and your IP is visible to peers like in any P2P app. For separation of contexts, use multiple accounts; for IP privacy, use a VPN or Tor. Full picture: [Threat model](../security/threat-model.md).

### How is this different from Signal? From Matrix? From Farcaster?

Briefly: **Signal** is the gold standard for content encryption, but it requires a phone number — a real-world identity anchor — and runs on central servers you have to trust to stay up and neutral; Pombo asks for no identifier at all and has no backend to trust. **Matrix** federates servers; Pombo has no backend to federate — transport is P2P and state is on-chain. **Farcaster**-style social protocols are public-first; Pombo is messaging-first with E2EE DMs and encrypted channels. Pombo's particular corner is: no sign-up, no servers, creator-owned channels, sealed-sender DMs.
