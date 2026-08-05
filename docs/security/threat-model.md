---
id: threat-model
title: Threat model
description: What Pombo protects, what it trusts, and what it deliberately does not hide. No marketing — the honest list.
---

# Threat model

Privacy tools earn trust by being precise about their limits. This page is the honest list: what Pombo protects, which third parties remain in the picture, and which metadata is visible — including things that are visible *by design*.

## What Pombo protects

- **DM content and sender identity.** DMs are end-to-end encrypted (ECDH + AES-256-GCM) with sealed sender: no party except the recipient — not the network, not storage nodes, not relays — learns the content *or who sent it*.
- **Password-channel content.** Encrypted client-side; the network carries ciphertext published by throwaway keys.
- **Your account on the wire.** In public and password channels and DMs, message traffic is published under an ephemeral session key, not your wallet. Native and read-only channels publish under your real account (their membership is on-chain and public anyway); owner moderation actions do too — see visible metadata below.
- **Your data at rest.** Keys and app state are encrypted on-device and isolated per account (a few low-sensitivity preferences remain in plain browser storage).
- **Push privacy.** Notifications carry no content, and k-anonymity tags prevent the relay from identifying recipients.
- **No analytics or telemetry.** The app contacts the third-party infrastructure it needs (listed below) but reports nothing about you by design, and the Streamr SDK's default metrics stream is disabled.

## Trusted or centralized components

Pombo has no backend, but it is not free of third parties. Today you are trusting:

| Component | What it could learn or do |
|---|---|
| **Google FCM / Apple APNs** | Learn that your device runs Pombo (inherent to platform push). Cannot see content or contacts. |
| **The push relay** (one in production today) | Sees tag buckets and timing. If down, push stops (messaging is unaffected). |
| **Public RPCs and ENS infrastructure** | Polygon RPCs serve chain queries, Ethereum RPCs resolve ENS names (with decoy queries), and the ipfs.io gateway serves ENS avatars — all see the requests and your IP. You can configure your own RPC endpoint. |
| **The Graph** | Serves channel-type and membership queries. The app ships with a shared default API key (you can configure your own). |
| **The default storage cluster** | Run by the Pombo project (two replicated servers, one operator). Holds ciphertext for password channels, native channels and DMs; plaintext for public channels — like any storage node you could choose instead. |
| **app.pombo.cc itself** | A hosted interface. Its operator controls what *this interface* shows (e.g. Explore curation) — but not the protocol, and alternate clients are possible. |

## Visible metadata

Things an observer can see, some inherent to the design:

- **Public channels are public.** Anyone implementing the message format can recover the real account behind each message and correlate a person's activity **across public channels**. The countermeasure is using separate accounts, not a setting.
- **Channel creators are permanent public record** — the creator's address is embedded in the channel ID.
- **Native-channel membership is on-chain** and queryable by anyone.
- **Moderation is visible.** In public channels the moderation state (ban lists, pins) is world-readable; in password channels it is encrypted for members; in native channels it is member-only. In every type, though, moderation actions are published by the **owner's real wallet**, exposing the owner and the timing of each action.
- **Your wallet touches the wire in native and read-only channels** (all traffic, including file uploads) and in owner moderation actions — contexts where your permission is on-chain and therefore already public. Elsewhere, file uploads ride the channel's throwaway identity like any other message.
- **Password channels are brute-forceable offline.** Each publishes a password-verification challenge that anyone can fetch and grind guesses against (at a costly 310k PBKDF2 iterations per guess). A password channel is exactly as secret as its password is strong.
- **DM inboxes are enumerable.** Given any Ethereum address, anyone can find its inbox and encryption public key. Reading it is owner-only on-chain, so observing arrival timing/volume takes a node in the stream's topology or the storage operator. Sealed sender hides *who wrote*, not *that something arrived*.
- **Display names travel in cleartext** in public-channel presence and typing signals.
- **IP addresses are visible to network peers**, as in any P2P system, and timing correlation is possible for a well-positioned observer. Today, pair Pombo with a VPN or Tor if your threat model includes network observers; a proxy-node layer built on Streamr Sponsorships is in development to address this at the protocol level.
- **Behavioral signals** — display names, writing style, presence patterns — are not addressed by any protocol layer.

## Known open problems

- **DM spam.** Inboxes are public-write by design, so anyone can send to anyone — including spam that consumes inbox storage. Rate-limiting mechanisms were evaluated and rejected as ineffective at this layer; a better answer is an open research question.
- **Moderation in open channels is advisory.** Accounts are free, so bans in public/password channels are one click to evade. Enforceable moderation exists only in native channels.
- **Push anonymity scales with the user base.** The k in k-anonymity is roughly (users ÷ 256); a small network means small anonymity sets.
- **No key rotation for a compromised account.** Identity *is* the keypair. If your key leaks, the account is the attacker's too; there is no revocation. Migrate to a new account.