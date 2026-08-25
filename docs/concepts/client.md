---
id: client
title: Client
description: The system in one narrative — a client on your device, Streamr for transport, storage nodes for history, Polygon for ownership.
---

# Client

Pombo has no message backend: no server receives, routes or authorizes your conversations. Everything you'd expect a backend to do is done either by the client on your device or by open infrastructure that anyone can run. The client sits on top of three layers:

```
┌─────────────────────────────────────────────┐
│  Pombo client (browser PWA / Android app)   │
│  identity · encryption · UI                 │
├─────────────────────────────────────────────┤
│  Streamr Network      →  message transport  │
│  (P2P pub/sub)           & delivery         │
├─────────────────────────────────────────────┤
│  Storage nodes        →  message history    │
│  (Streamr + Cassandra)   & offline delivery │
├─────────────────────────────────────────────┤
│  Polygon PoS          →  ownership &        │
│  (Streamr registries)    permissions        │
└─────────────────────────────────────────────┘
```

Follow one message through the system and the whole architecture appears. You type in a channel; the client encrypts the message if the channel calls for it, signs it, and publishes it to one of the channel's *streams* on the **Streamr Network** — a peer-to-peer pub/sub network, so it propagates directly between subscribers with no relay server in the middle. A **storage node** archiving that stream keeps a copy, which is how members who were offline read it later. And the reason the network accepted the message at all — who owns the channel, who may publish to it — is a record on **Polygon PoS**, public blockchain state rather than a row in someone's database.

Each layer in one line:

- **Transport — Streamr Network.** Messages are published to streams (topics) and propagate peer-to-peer between subscribers.
- **Ownership — Polygon PoS.** Streams are registered on-chain in the Streamr registry contracts. On-chain writes (creating a channel, granting membership) cost a small fee in POL; everything else is free.
- **Persistence — storage nodes.** Streamr nodes running the storage plugin retain stream history, so messages reach people who were offline. See [Storage & Sync](storage-and-sync.md).
- **Cryptography — your device.** Keys are generated and used locally. All encryption and signing happens client-side before anything is published. Two deliberate choices are worth knowing: the Streamr SDK's own encryption layer is **disabled** — all confidentiality is applied at the app layer, as [Encryption](encryption.md) describes — and channel messages are published under a per-channel throwaway key carrying a signed proof of the real account inside the payload (in contract-backed channels, the publisher is the membership contract instead; see [Privacy model](privacy-model.md)).

Beyond these layers, the client talks to a small set of auxiliary services — public RPC endpoints, The Graph, the push relay ([Push notifications](notifications.md) explains that whole subsystem), the Explore curation manifest — none of which handle message content. The full list and what each one sees is in the [threat model](../security/threat-model.md).

## The interface is replaceable

Pombo (the app at app.pombo.cc) is *an* interface to this protocol, not *the* system. All of the state — identities, channels, permissions, history — lives on public networks. Anyone can build another client against the same streams, and if the Pombo interface vanished, the protocol and your data would remain.
