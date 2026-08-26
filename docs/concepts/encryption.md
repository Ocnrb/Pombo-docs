---
id: encryption
title: Encryption
description: How Pombo encrypts DMs (ECDH + sealed sender), protected channels, epoch-keyed private channels, and local state.
---

# Encryption

All cryptography in Pombo runs **on your device**. The web app uses the browser's built-in WebCrypto for symmetric operations and audited Ethereum libraries for elliptic-curve operations; the Android app uses the platform's native crypto for symmetric operations and runs the same Ethereum library code for elliptic-curve operations, guaranteeing byte-for-byte compatibility between the two. Private keys never leave your device; the only key material ever published is your *public* key, attached to your DM inbox so others can encrypt to you.

This page covers what encryption protects: the *content*. The separate question — who can see that it was **you** — is the subject of the [privacy model](privacy-model.md).

## Direct messages: end-to-end, sealed sender

DMs use the strongest protection in Pombo:

1. **Key agreement — ECDH on secp256k1.** For each message, a *fresh ephemeral keypair* and the recipient's static public key derive a shared secret. The recipient's public key is published as metadata on their DM inbox, so no online handshake is needed.
2. **Key derivation — HKDF-SHA256** turns the shared secret into an encryption key.
3. **Encryption — AES-256-GCM** with a fresh random IV per message (authenticated encryption: tampering is detected).

### Sealed sender

On the wire, a DM doesn't reveal who sent it — not even to the network. Each message is sealed with a **fresh ephemeral keypair**: the network sees a throwaway address as the publisher, and the sender's real identity (a cryptographic proof of it) travels *inside* the encrypted envelope. Only the recipient, upon decrypting, learns who wrote to them.

What this means concretely: a network observer watching your inbox can see *that* messages arrive (inboxes are public-write by design), but not *who* they're from or what they say.

### Asynchronous by design

Because encryption is pure key-derivation (no session handshake), the recipient can be offline for days: the sealed message waits in their stored inbox and decrypts whenever they return. Images and files sent in DMs are sealed the same way, with a fresh ephemeral key per transfer.

### What that costs: no forward secrecy in DMs

There is no ratchet, so message keys are not destroyed after use. What a stolen key opens follows the mailbox model, and it is not symmetric:

- **Your key** opens the DMs you **received**, because those sit in your inbox.
- **The other person's key** opens the DMs you **sent**, because those sit in theirs.
- Your device also holds your own copy of what you sent, since you cannot read it back from the network.

So a compromise reaches whatever is still retained, not only what follows it. Signal makes the opposite trade: its ratchet destroys each key immediately, and the price is that history cannot be recovered from the network at all. Pombo needs that recovery, because restoring a backup or opening a second device is exactly the act of deriving those keys again.

Retention is the lever. A short one on your inbox shrinks what your key would expose; it does nothing for what you sent, which lives under someone else's retention. [The threat model](../security/threat-model.md#shrinking-what-a-seizure-would-find) covers how far that goes.

Channels differ: their epoch keys do rotate, see [Rotation and history](#rotation-and-history) below.

## Protected channels

Protected-channel messages are encrypted with **AES-256-GCM** under a key derived from the shared password via **PBKDF2 (310,000 iterations, SHA-256)**. The network and storage nodes carry only ciphertext. Anyone who has the password can derive the key — the secrecy of the channel is exactly the secrecy of its password.

## Closed, gated and paid channels

These are encrypted with an **epoch key**: one AES-256-GCM key shared by the whole channel, versioned, and rotated over time. Every message carries the identifier of the key that sealed it, so a client picks the right one without trial decryption. The Streamr SDK's own group-key layer is not used.

### How members get the key

Getting the key is a small protocol of its own, running on the channel's keys stream:

1. The channel admin **announces** each new epoch — its number, an identifier, and a hash of the key. The key itself is never announced.
2. A newcomer who passes the gate **requests** it, publishing a throwaway public key made fresh for that one request.
3. **Any member** already holding the key may answer, sealing it to that throwaway key (the same ECDH + HKDF + AES-256-GCM construction as a DM).
4. The newcomer accepts the key only if it hashes to what the admin announced.

Three properties fall out of that design. Distribution does not depend on the admin — any member can answer, so a channel does not go dark when its owner sleeps. A malicious member cannot poison the key, only waste bandwidth, because the admin's hash is the anchor. And because the keys stream is *stored*, a request waits for an answer instead of requiring the two people to be online simultaneously.

The one irreducible cost: between passing the gate and receiving the key there is a wait, during which the app shows the channel as waiting for keys. It is over as soon as any member's client sees the request.

### Rotation and history

Epoch keys rotate — on a weekly cadence in gated and paid channels, and whenever the owner removes someone. Rotation is what turns a contract-level revocation into an actual loss of access: a member who sells the gate asset or lets a subscription lapse keeps reading until the current epoch ends.

How much history a new member receives depends on the channel:

- **Closed, gated by token or NFT** — every retained epoch. Holding access *is* the condition, so there is nothing to withhold.
- **Paid** — the current epoch only. A subscription buys the future, never the channel's past.

What the epoch key protects is the *content*. It does not conceal who wrote each message: authorship travels outside the encryption in these channels, necessarily — see [Privacy model](privacy-model.md#contract-backed-channels).

## Open channels

Open channels are **intentionally not encrypted** — they are public rooms, and their content is signed plaintext. What Pombo protects there is different: your network-level identity, via ephemeral publisher keys (see [Privacy model](privacy-model.md)).

## What is protected locally

Independently of transport encryption:

- Your **private key** is stored encrypted at rest — on the web as a scrypt-encrypted keystore unlocked by your password; on Android in encrypted preferences under a device-bound key from the Android Keystore (no password — see [Account](../getting-started/identity.md)).
- The app's **state** (contacts, channel list, settings) is encrypted with AES-256-GCM and isolated per account. On the web the key derives from a deterministic wallet signature (PBKDF2, 310,000 iterations); on Android it is protected by the platform's native encrypted storage.
- In the web app, a few low-sensitivity items remain in plain browser storage (display name, ENS cache, which streams are registered for push).

See [Account](../getting-started/identity.md).
