---
id: glossary
title: Glossary
description: Pombo and Streamr terminology, defined.
---

# Glossary

**Account** — an Ethereum keypair generated locally by Pombo. Your address is your identity; no registration exists anywhere.

**Admin stream** — the third stream of every channel, writable only by the owner, carrying moderation state (bans, hidden messages, pins).

**Channel** — Pombo's group space: a set of three Streamr streams (messages, ephemeral, admin) owned by its creator.

**DM inbox** — your personal mailbox stream, derived from your address. Anyone can deposit (publish); only you can read (subscribe). Also carries your encrypted cross-device sync data.

**Ephemeral publisher key** — the throwaway keypair Pombo uses as your network-level identity in a channel session, so your real account never appears on the wire. Discarded when you leave.

**Ephemeral stream** — a channel's unstored stream: presence, typing indicators and live media transfer. Nothing published here is archived.

**Guest mode** — a throwaway account with no persistence, for looking around.

**k-anonymity tag** — the 1-byte destination hint in push wake signals. With only 256 buckets, many users share each tag, so the relay can't tell who a notification is for.

**Mesh sharing** — live P2P file transfer between online peers over the ephemeral stream. Needs an online seeder.

**Native channel** (on-chain channel) — a channel whose membership is enforced by per-address permissions recorded on Polygon. The only channel type with enforceable bans.

**Password channel** — a channel encrypted client-side with a key derived from a shared password (PBKDF2 → AES-256-GCM). The network sees only ciphertext.

**Persistent sharing** — storage-node-backed file transfer: files are chunked into the channel's stored stream, downloadable for the retention period with the sender offline.

**POL** — Polygon PoS's native currency, used for the small network fees on on-chain actions (creating channels, managing native-channel members).

**Publisher proof** — a signature by your real account over your ephemeral publisher key, letting other Pombo clients verify who you are. Public in public channels; sealed inside the encryption envelope in password channels and DMs.

**Relay (push relay)** — a community-runnable server that converts Streamr wake signals into Web Push notifications, blind to content and identities.

**Retention** — how long a storage node keeps a stream's history; chosen by the channel owner, 180 days by default.

**Sealed sender** — Pombo's DM envelope: the sender's identity travels inside the ciphertext, so even the recipient's inbox doesn't reveal who wrote until the recipient decrypts.

**Storage node** — a Streamr node (backed by Cassandra) that archives stream history and serves it back, enabling offline delivery and history.

**Stream** — Streamr's pub/sub primitive: a named, on-chain-registered topic that peers publish to and subscribe from. Everything in Pombo is built from streams.

**Streamr Network** — the decentralized P2P pub/sub network Pombo uses as its message transport.

**Wake signal** — a contentless push trigger broadcast when someone messages you: just a k-anonymity tag plus proof-of-work. Your device wakes and fetches the real message from the network.
