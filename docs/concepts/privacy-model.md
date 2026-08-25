---
id: privacy-model
title: Privacy model
sidebar_label: Privacy
description: Ephemeral publisher identities, sealed sender, and what an observer of the network can actually see.
---

# Privacy model

Pombo's privacy design has one organizing idea: **your real account should not be visible on the wire unless the context deliberately makes it so.** [Encryption](encryption.md) protects *what you said*; this page is about who can see *that it was you*, and what an observer of the network actually learns.

For the separate question of what data leaves your device and who receives it, see the [privacy policy](/legal/privacy-policy); for what an attacker can achieve, the [threat model](../security/threat-model.md).

## Ephemeral publisher identities

When you join a channel, Pombo generates **one throwaway keypair per channel** and uses it as your network-level publisher identity across all of that channel's streams. It is created on your first publish, never persisted, and discarded when you leave the channel or disconnect. The address the network sees is not your account.

Your real identity travels as a **publisher proof** — a signature by your account over the ephemeral key — so that *other Pombo clients* can verify who you are and show your name. Where that proof travels is what varies by context:

| Context | Publisher on the wire | Where the identity proof lives | Who learns your real account |
|---|---|---|---|
| Open channel | Ephemeral, rotates per join | Plaintext in the message | Anyone who parses the Pombo format |
| Protected channel | Ephemeral | Inside the AES envelope | Channel members only |
| Direct message | Ephemeral ([sealed sender](encryption.md#sealed-sender)) | Inside the ECDH envelope | The recipient only |
| Closed / gated / paid channel | The channel's membership contract | Your account's signature on the message itself | Anyone |
| Read-only channel (owner posts) | Your real account | — (not needed) | Anyone |

So in a **protected channel**, an outside observer sees only ciphertext published by random throwaway addresses. In a **DM**, even your recipient's inbox reveals nothing about you to observers. In an **open channel**, your identity is readable — deliberately, because public rooms are public — but only at the application layer, not as raw wallet signatures on the transport.

## Contract-backed channels

Closed, gated and paid channels are the one place where the throwaway identity does not apply, and the reason is worth understanding rather than memorizing.

Access there is enforced by the network itself: before accepting your message, nodes check its signature against the channel's membership contract. That check is what makes a ban stick. But it means the signature has to be **readable by parties that hold no key** — the network is not a member and never will be. So while the contract's address is what appears as the publisher, your account's signature travels beside it in the clear, and recovering your address from it is arithmetic anyone can do.

The result is a clean trade rather than a leak. Content stays encrypted to members. Authorship is public: who wrote in the channel, and when. Enforceable access and publisher anonymity pull in opposite directions, and these channel types choose enforcement.

:::note[Designed, not built]
A pseudonymous mode — proving membership once at the door, then publishing under a throwaway key with authorship moved inside the ciphertext — is designed and not implemented. It would trade some of the enforcement back for privacy, which is why it is a mode rather than a replacement.
:::

The [threat model](../security/threat-model.md#visible-metadata) covers how far that authorship actually travels.

## Anonymity = another account

Pombo intentionally has **no per-channel "anonymous mode" toggle**. If you want to participate somewhere without linking it to your main identity, create another account — it's free, instant, and completely unlinked (each account's local data is isolated). This is a deliberate design decision: one strong, simple mechanism instead of a subtle toggle that's easy to get wrong.

## Metadata protections that are on by default

- **ENS lookups are decoyed** in the direction that runs constantly: resolving the name behind an address you see mixes the real lookup with decoy addresses, in shuffled order, so RPC operators can't tell which one you cared about. Resolving a name *you typed* — starting a DM, sending an invite — is not covered, and the provider sees exactly the name you asked for.
- **Push notifications carry no content** and use k-anonymity tags so the relay can't tell who a notification is really for — see [Push notifications](notifications.md).
- **Cross-device sync is sealed to yourself**: state snapshots published to your own inbox are encrypted so only your key can read them, and any payload not authored by your own wallet is rejected.
- **Network node IDs are not derived from your wallet.**

## What this model does *not* hide

Honest limits, in brief — the full list is in the [threat model](../security/threat-model.md):

- Open channels are public: anyone can recover your account from the proof and correlate your activity across open channels.
- Contract-backed channels do not hide authorship — [see above](#contract-backed-channels).
- Read-only channels and moderation actions you perform as owner publish under your **real wallet**, as does your ownership of the channel itself.
- A channel creator's address is embedded in the channel ID forever.
- Membership of contract-backed channels is public blockchain state: who is allowlisted, who is banned, who paid for a subscription and until when.
- DM inboxes are enumerable, and their traffic pattern is public: given any address, anyone can find its inbox, and an unauthenticated request to the storage node returns its retained envelopes. When messages arrived and how many is readable by anyone. What that does *not* reveal is who they were from — every message carries a different throwaway publisher and sealed content ([threat model](../security/threat-model.md#visible-metadata)).
- Your IP address is visible to network peers, as in any P2P system. For now, use a VPN or Tor if IP privacy matters to you; a proxy-node layer built on Streamr Sponsorships is in development to address this at the protocol level.
- **ENS profile pictures are fetched from wherever their owner points them.** Seeing someone's avatar means your client requests an image from a server *they* chose, which learns your IP address — and someone can point their avatar at a server they run precisely to collect that. Pombo requires HTTPS and routes `ipfs://` avatars through a public gateway, neither of which hides who made the request. **Settings → Content → ENS Avatars** turns the fetch off entirely and falls back to the generated identicon; it is on by default, and off it holds everywhere an avatar is drawn, including the screens shown before you unlock and the pictures attached to notifications.
