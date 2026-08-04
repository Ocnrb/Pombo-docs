---
id: backup-and-recovery
title: Backup and recovery
description: Export a portable, encrypted backup of your account — the only recovery mechanism that exists.
---

# Backup and recovery

:::danger The one rule
Pombo has no servers and no custodians, so there is **no "forgot password", no account recovery, no support ticket** that can bring an account back. Your backup file *is* the recovery mechanism. Make one when you create your account, and keep it somewhere safe.
:::

## Exporting a backup

In settings, export your account backup. You get a single portable file containing:

- your **encrypted key** (Keystore V3), and
- your **encrypted app state** (contacts, channels, settings).

The file is encrypted with scrypt under your **account password** (verified before export) — without it, the file is useless to whoever finds it. Note that the backup does contain content: your sent messages, reactions and images are inside (encrypted), so treat the file with the same care as the key itself.

## Restoring

On any device — new phone, fresh browser, after a reinstall — import the backup file and enter your account password. Your identity and data are restored exactly.

## What backup does *not* cover

- **Received message history** isn't in the backup — it lives on the network and re-downloads from storage nodes (within each channel's retention window). Your *sent* DMs and images are included.
- A backup is a snapshot: state changes after export aren't in it. For continuously-synced state across devices, just log in on both — see below.

## Multi-device sync

You don't need to shuttle backup files between devices you use actively. Import your account once on each device; from then on, Pombo syncs state automatically through your own DM inbox, self-encrypted so only your key can read it (see [Storage and persistence](../concepts/storage-and-persistence.md#cross-device-sync)).

## Practical advice

- Export a backup **immediately after creating your account**, before it has anything to lose.
- Re-export occasionally, or after big changes (new channels you own, important contacts).
- The backup opens with your **account password** — losing that is the same as losing the backup. Store both well.
