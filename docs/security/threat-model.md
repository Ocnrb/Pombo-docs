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
- **Your account on the wire.** In all channel types, the transport-level publisher is an ephemeral session key, not your wallet.
- **Your data at rest.** Keys and app state are encrypted on-device; accounts are isolated from each other.
- **Push privacy.** Notifications carry no content, and k-anonymity tags prevent the relay from identifying recipients.
- **No telemetry.** The app reports nothing about you to anyone.

## Trusted or centralized components

Pombo has no backend, but it is not free of third parties. Today you are trusting:

| Component | What it could learn or do |
|---|---|
| **Google FCM / Apple APNs** | Learn that your device runs Pombo (inherent to platform push). Cannot see content or contacts. |
| **The push relay** (one in production today) | Sees tag buckets and timing. If down, push stops (messaging is unaffected). |
| **Public RPC endpoints** (Polygon, Ethereum) | See your chain queries and your IP. ENS lookups are decoyed to blunt this; a deliberate decision was made *not* to proxy RPC through Pombo servers, since that would move trust rather than remove it. |
| **The Graph** | Serves channel-type and membership queries. |
| **The default storage cluster** | Run by the Pombo project (two replicated servers, one operator). Holds ciphertext for encrypted contexts, plaintext for public channels — like any storage node you could choose instead. |
| **app.pombo.cc itself** | A hosted interface. Its operator controls what *this interface* shows (e.g. Explore curation) — but not the protocol, and alternate clients are possible. |

## Visible metadata

Things an observer can see, some inherent to the design:

- **Public channels are public.** Anyone implementing the message format can recover the real account behind each message and correlate a person's activity **across public channels**. The countermeasure is using separate accounts, not a setting.
- **Channel creators are permanent public record** — the creator's address is embedded in the channel ID.
- **Native-channel membership is on-chain** and queryable by anyone.
- **Ban lists are publicly readable** (the moderation stream is world-subscribable).
- **DM inboxes are enumerable.** Given any Ethereum address, anyone can find its inbox and observe that messages arrive (timing and volume). Sealed sender hides *who wrote*, not *that something arrived*.
- **IP addresses are visible to network peers**, as in any P2P system, and timing correlation is possible for a well-positioned observer. Pombo does not anonymize traffic — pair it with a VPN or Tor if your threat model includes network observers.
- **Behavioral signals** — display names, writing style, presence patterns — are not addressed by any protocol layer.

## Known open problems

- **DM spam.** Inboxes are public-write by design, so anyone can send to anyone — including spam that consumes inbox storage. Rate-limiting mechanisms were evaluated and rejected as ineffective at this layer; a better answer is an open research question.
- **Moderation in open channels is advisory.** Accounts are free, so bans in public/password channels are one click to evade. Enforceable moderation exists only in native channels.
- **Push anonymity scales with the user base.** The k in k-anonymity is roughly (users ÷ 256); a small network means small anonymity sets.
- **No key rotation for a compromised account.** Identity *is* the keypair. If your key leaks, the account is the attacker's too; there is no revocation. Migrate to a new account.

## Non-goals

Pombo does not attempt to be: an anonymity network (no onion routing), a blockchain-free system (ownership *should* be on-chain), or a moderated platform (the protocol is neutral; interfaces curate).
