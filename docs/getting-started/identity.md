---
id: identity
title: Your identity and keys
description: How Pombo accounts work — locally generated Ethereum keypairs, no sign-up, no recovery service.
---

# Your identity and keys

A Pombo account is an **Ethereum keypair generated locally on your device**. Creating one costs nothing, requires no email or phone number, and never touches a server.

Your address (`0x…`) is your identity on the network: it's how people DM you, how channel permissions are granted to you, and how your channels are owned by you.

## How your key is protected

- Your private key is stored **encrypted at rest** using the standard Ethereum Keystore V3 format (scrypt key derivation + AES), unlocked with the password you choose.
- On Android, the key is protected by the hardware-backed Android Keystore.
- All other local app data (contacts, channel list, message cache) is additionally encrypted with AES-256-GCM using a key derived from your wallet — one account cannot read another account's local data.

## There is no "Forgot password"

:::danger Back up your account
Pombo has no servers, which also means **no account recovery**. No company can reset your password or restore your key. If you lose your device and have no backup, the account — and everything encrypted with it — is gone permanently.

Export a backup file as soon as you create your account: see [Backup and recovery](../guides/backup-and-recovery.md).
:::

## Multiple accounts and guest mode

- You can create and switch between **multiple named accounts** on the same device, each with its own isolated data.
- **Guest mode** gives you a throwaway account with no persistence — useful for having a look around without creating anything.

Because accounts are free and instant, switching accounts is also Pombo's answer to pseudonymity: rather than a per-channel "anonymous mode", you simply use a different account for contexts you want to keep separate. See [Privacy model](../concepts/privacy-model.md) for why this matters.

## Using an existing wallet

You can import an existing Ethereum private key into Pombo. Connecting an external wallet (MetaMask, hardware wallets) without importing the key — via a signed delegation — is on the roadmap but **not yet available**.

## ENS names

If your address has an ENS name, Pombo resolves and displays it. Lookups go to public Ethereum RPC endpoints; Pombo adds decoy queries so the RPC operator can't tell which address you were actually interested in.
