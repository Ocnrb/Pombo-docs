---
id: encryption
title: Encryption
description: How Pombo encrypts DMs (ECDH + sealed sender), password channels, and media.
---

# Encryption

All cryptography in Pombo runs **on your device**, using the browser's built-in WebCrypto for symmetric operations and audited Ethereum libraries for elliptic-curve operations. Keys are never sent anywhere.

## Direct messages: end-to-end, sealed sender

DMs use the strongest protection in Pombo:

1. **Key agreement — ECDH on secp256k1.** Your key and the recipient's public key derive a shared secret. The recipient's public key is published as metadata on their DM inbox, so no online handshake is needed.
2. **Key derivation — HKDF-SHA256** turns the shared secret into an encryption key.
3. **Encryption — AES-256-GCM** with a fresh random IV per message (authenticated encryption: tampering is detected).

### Sealed sender

On the wire, a DM doesn't reveal who sent it — not even to the network. Each message is sealed with a **fresh ephemeral keypair**: the network sees a throwaway address as the publisher, and the sender's real identity (a cryptographic proof of it) travels *inside* the encrypted envelope. Only the recipient, upon decrypting, learns who wrote to them.

What this means concretely: a network observer watching your inbox can see *that* messages arrive (inboxes are public-write by design), but not *who* they're from or what they say.

### Asynchronous by design

Because encryption is pure key-derivation (no session handshake), the recipient can be offline for days: the sealed message waits in their stored inbox and decrypts whenever they return. Images and files sent in DMs are sealed the same way, with a fresh ephemeral key per transfer.

## Password channels

Password-channel messages are encrypted with **AES-256-GCM** under a key derived from the shared password via **PBKDF2 (310,000 iterations, SHA-256)**. The network and storage nodes carry only ciphertext. Anyone who has the password can derive the key — the secrecy of the channel is exactly the secrecy of its password.

## Native channels

On-chain (native) channels use the Streamr SDK's built-in encryption with on-chain access control: only addresses granted permission can subscribe and obtain keys. A Pombo-level group-key layer for native channels is designed but not yet shipped.

## Public channels

Public channels are **intentionally not encrypted** — they are open rooms, and their content is signed plaintext. What Pombo protects there is different: your network-level identity, via ephemeral publisher keys (see [Privacy model](privacy-model.md)).

## What your password protects locally

Independently of transport encryption, everything Pombo stores on your device — key, contacts, cached messages — is encrypted at rest (Keystore V3 with scrypt for the key itself; AES-256-GCM for app state). See [Your identity and keys](../getting-started/identity.md).
