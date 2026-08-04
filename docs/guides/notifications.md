---
id: notifications
title: Notifications
description: How Pombo delivers push notifications without learning who you are — wake signals, k-anonymity, and a blind relay.
---

# Notifications

Push notifications are the hardest feature to do privately: the platforms (Google FCM, Apple APNs) sit in the delivery path by construction. Pombo's design goal is that **no party in the push path — relay, Google, or Apple — learns who is messaging whom, or what was said.**

## How it works

1. When someone messages a channel or inbox you follow, their client broadcasts a **wake signal** on a public Streamr stream. The signal contains no message content — only a **1-byte tag** derived from the destination, plus a small proof-of-work to deter spam.
2. A **relay** (an open-source, community-runnable server) listens for wake signals, checks the proof-of-work, and fires a Web Push to *every* device registered under that tag.
3. Your device wakes, connects to Streamr directly, and checks whether there's actually a message for you. Only then does a notification render — with content fetched over the P2P network, never through the push system.

The 1-byte tag is the key trick: with only 256 possible tags, many users share each one (**k-anonymity**). The relay knows "someone in bucket 173 has mail," not who. The cost is that your device occasionally wakes for someone else's message and silently goes back to sleep.

## What the push path does and doesn't learn

| Party | Learns | Does not learn |
|---|---|---|
| Relay | Tag bucket, aggregate frequency | Message content, sender, sender's IP, which user you are |
| Google / Apple | That your device runs Pombo | Content, sender, which channels/contacts you have |
| Network observer | Wake-signal timing | Content, recipient beyond the tag bucket |

The honest residual: platform push tokens inherently tell Google/Apple *that* you use Pombo, and timing correlation is possible for an observer watching both the wake stream and a target. Small user bases also mean smaller anonymity sets.

## Platform notes

- **iOS**: notifications require the PWA to be **installed to the Home Screen** (iOS 16.4+). Safari-tab usage won't receive push.
- **Android (native app)**: uses Firebase Cloud Messaging. Battery optimizations (Doze, Adaptive Battery) can delay delivery by minutes — exempting Pombo from battery optimization helps.
- **Relay availability**: today one community relay serves the network; if it's down, push pauses (messages are unaffected — they're waiting on the network). The relay is open source and anyone can run one — see [Run a push relay](../operators/run-a-relay.md).

## In-app notifications and invites

Notifications *inside* Pombo (channel invites, mentions) don't use the push system at all — they're delivered through your DM inbox, end-to-end encrypted like any DM.
