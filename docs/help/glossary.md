---
id: glossary
title: Glossary
description: Pombo and Streamr terminology, defined.
---

# Glossary

**Account** — an Ethereum keypair generated locally by Pombo. Your address is your identity; no registration exists anywhere.

**Admin stream** — the third stream of every channel, writable only by the owner, carrying moderation state (bans, hidden messages, pins).

**Channel** — Pombo's group space: a set of Streamr streams owned by its creator (messages, ephemeral, admin — plus a keys stream when membership is contract-backed).

**Closed channel** — a channel whose members are an allowlist in its own on-chain membership contract, managed by the owner. Called a *native channel* in Pombo's source code, which is the earlier generation of the same idea.

**DM inbox** — your personal mailbox stream, derived from your address and created on-chain (a one-time small fee). Anyone can deposit (publish); only you can read (subscribe). It publishes your encryption public key so others can seal messages to you, and carries your encrypted cross-device sync data.

**Epoch key** — the encryption key shared by the members of a closed, gated or paid channel. Versioned and rotated over time; a member holds every epoch they were given, and messages name the one that sealed them.

**Ephemeral publisher key** — the throwaway keypair Pombo uses as your network-level identity in a channel session, so your real account never appears on the wire. Discarded when you leave.

**Ephemeral stream** — a channel's unstored stream: presence, typing indicators and live media transfer. Nothing published here is archived.

**Gate (PomboGate)** — the membership contract deployed with each closed, gated or paid channel. It answers two questions: was this author ever a member (which is what the network checks on every message), and does this address have access right now (which decides key distribution and what the app shows).

**Gated channel** — a channel whose gate admits anyone holding a chosen token balance or NFT. No payment is involved: holding is the ticket.

**Guest mode** — a throwaway account with no persistence, for looking around. Guests have no DM inbox, so no DMs and no sync.

**k-anonymity tag** — the 1-byte destination hint in push wake signals. With only 256 buckets, many users share each tag, so the relay can't tell who a notification is for.

**Mesh sharing** — live P2P file transfer between online peers over the ephemeral stream. Needs an online seeder.

**Keys stream** — the fourth stream of a contract-backed channel, where epoch keys are announced, requested and handed out. Stored, so a join doesn't require another member to be online at that moment.

**Moderator** — an address the owner of a contract-backed channel appoints to manage membership and bans. Cannot erase history, act on the owner or other moderators, or appoint further moderators.

**Paid channel** — a channel whose gate admits anyone with an active subscription: a price in a chosen token, per period, paid directly to the channel owner. New subscribers receive only the current epoch key, so the channel's past does not open for them.

**Password channel** — a channel encrypted client-side with a key derived from a shared password (PBKDF2 → AES-256-GCM). The network sees only ciphertext.

**Persistent sharing** — storage-node-backed file transfer: files are chunked into the channel's stored stream, downloadable for the retention period with the sender offline.

**POL** — Polygon PoS's native currency, used for the small network fees on on-chain actions (creating channels, your DM inbox, managing members, changing retention or storage nodes).

**Publisher proof** — a signature by your real account over your ephemeral publisher key, letting other Pombo clients verify who you are. Public in public channels; sealed inside the encryption envelope in password channels and DMs. Contract-backed channels don't need it: there, your account signs the message itself.

**Relay (push relay)** — a community-runnable server that converts Streamr wake signals into Web Push notifications, blind to content and identities.

**Retention** — how long a storage node keeps a stream's history; chosen by the channel owner, 180 days by default.

**Sealed sender** — Pombo's DM envelope: the sender's identity travels inside the ciphertext, so even the recipient's inbox doesn't reveal who wrote until the recipient decrypts.

**Storage node** — a Streamr node (typically backed by Cassandra) that archives stream history and serves it back, enabling offline delivery and history.

**Stream** — Streamr's pub/sub primitive: a named, on-chain-registered topic that peers publish to and subscribe from. Everything in Pombo is built from streams.

**Streamr Network** — the decentralized P2P pub/sub network Pombo uses as its message transport.

**Wake signal** — a contentless push trigger broadcast when someone messages you: just a k-anonymity tag plus proof-of-work. Your device wakes and fetches the real message from the network.
