---
id: privacy-model
title: Privacy model
description: Ephemeral publisher identities, sealed sender, and what an observer of the network can actually see.
---

# Privacy model

Pombo's privacy design has one organizing idea: **your real account should not be visible on the wire unless the context deliberately makes it so.**

## Ephemeral publisher identities

When you join a channel, Pombo generates **one throwaway keypair per channel** and uses it as your network-level publisher identity across all of that channel's streams. It is created on your first publish, never persisted, and discarded when you leave the channel or disconnect. The address the network sees is not your account.

Your real identity travels as a **publisher proof** — a signature by your account over the ephemeral key — so that *other Pombo clients* can verify who you are and show your name. Where that proof travels is what varies by context:

| Context | Publisher on the wire | Where the identity proof lives | Who learns your real account |
|---|---|---|---|
| Public channel | Ephemeral, rotates per join | Plaintext in the message | Anyone who parses the Pombo format |
| Password channel | Ephemeral | Inside the AES envelope | Channel members only |
| Direct message | Ephemeral (sealed sender) | Inside the ECDH envelope | The recipient only |
| Native / read-only channel | Your real account | — (not needed) | Anyone — membership is already public on-chain |

So in a **password channel**, an outside observer sees only ciphertext published by random throwaway addresses. In a **DM**, even your recipient's inbox reveals nothing about you to observers. In a **public channel**, your identity is readable — deliberately, because public rooms are public — but only at the application layer, not as raw wallet signatures on the transport.

## Anonymity = another account

Pombo intentionally has **no per-channel "anonymous mode" toggle**. If you want to participate somewhere without linking it to your main identity, create another account — it's free, instant, and completely unlinked (each account's local data is isolated). This is a deliberate design decision: one strong, simple mechanism instead of a subtle toggle that's easy to get wrong.

## Metadata protections that are on by default

- **ENS lookups are decoyed**: each real lookup is mixed with decoy addresses so RPC operators can't tell which one you cared about.
- **Push notifications carry no content** and use k-anonymity tags so the relay can't tell who a notification is really for — and both wake signals and registrations are published under a fresh throwaway key. See [Notifications](../guides/notifications.md).
- **Cross-device sync is sealed to yourself**: state snapshots published to your own inbox are encrypted so only your key can read them, and any payload not authored by your own wallet is rejected.
- **Network node IDs are not derived from your wallet.**

## What this model does *not* hide

Honest limits, in brief — the full list is in the [threat model](../security/threat-model.md):

- Public channels are public: anyone can recover your account from the proof and correlate your activity across public channels.
- Native and read-only channels, and moderation actions you perform as owner, publish under your **real wallet** — on-chain permission can't be held by a throwaway key. In all these cases your participation was already public on-chain.
- A channel creator's address is embedded in the channel ID forever.
- Native-channel member lists are on-chain and queryable.
- DM inboxes are enumerable: given any address, anyone can find its inbox and encryption public key. Reading the inbox is owner-only on-chain, so observing arrival timing takes a node positioned in the stream's topology or the storage operator — not just any passerby.
- Your IP address is visible to network peers, as in any P2P system. For now, use a VPN or Tor if IP privacy matters to you; a proxy-node layer built on Streamr Sponsorships is in development to address this at the protocol level.
