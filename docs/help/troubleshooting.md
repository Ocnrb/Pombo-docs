---
id: troubleshooting
title: Troubleshooting
description: Common issues and how to resolve them.
---

# Troubleshooting

## I'm not receiving push notifications

Work through these in order:

1. **iOS:** push only works when Pombo is **installed to the Home Screen** (iOS 16.4+), not in a Safari tab. Reinstall via *Share → Add to Home Screen* and re-enable notifications.
2. **Android:** battery optimization (Doze, Adaptive Battery) delays or drops background pushes. Exempt Pombo from battery optimization in system settings.
3. **Notifications toggled on?** Check both the in-app setting and the OS-level permission for the app/site.
4. **Relay availability:** push depends on a community relay being online. If everything on your side looks right, the relay may be down — messages still arrive when you open the app; only the wake-up is affected.

Note that even when everything works, push is best-effort: delivery can lag by seconds to minutes depending on the platform's mood.

## Channel history is missing or incomplete

- History older than the channel's **retention period** (default 180 days) has expired from storage — that's by design.
- If *recent* messages appear and disappear between reloads, the storage node is having replica-consistency issues. There's nothing to fix client-side; it usually resolves when the operator repairs the node. Messages you watched arrive live are unaffected on your device.
- Channels on **custom storage nodes** depend on that node being up and correctly configured (HTTPS, valid certificate). If the owner's chosen node is unreachable, history won't load until it returns.

## A transaction failed when creating a channel or managing members

On-chain actions need a little POL for gas on Polygon PoS:

- Check your balance — a few cents' worth is enough. Note the app estimates the cost up front and **blocks creation below the estimate**, so "nothing happens" usually means insufficient balance, not a failure.
- Make sure you're not rejecting the transaction prompt.
- Public RPC endpoints occasionally rate-limit; retrying after a moment typically succeeds (the app rotates between several endpoints).

## I forgot my password / lost my device

If you have a **backup file**, import it and enter its passphrase — everything comes back. If you don't, the account cannot be recovered by anyone, including us; that's the flip side of no one else holding your keys. Create a new account and [back it up this time](../guides/backup-and-recovery.md).

## The app seems out of sync between my devices

Sync propagates through your DM inbox and applies on app open — give both devices a moment online. If a device has been offline longer than your inbox's retention, it may miss intermediate snapshots; re-importing a fresh backup file resyncs it fully.
