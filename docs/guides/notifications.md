---
id: notifications
title: Notifications
description: How Pombo delivers push notifications without learning who you are — wake signals, k-anonymity, and a blind relay.
---

# Notifications

Push notifications are the hardest feature to do privately: the platforms (Google FCM, Apple APNs) sit in the delivery path by construction. Pombo's design goal is that **no party in the push path — relay, Google, or Apple — learns who is messaging whom, or what was said.**

## How it works

1. When someone messages a channel or inbox you follow, their client broadcasts a **wake signal** on a dedicated Streamr push stream — anyone can publish to it, but subscribing is restricted to the relay; it is not a publicly readable feed. The signal contains no message content — only a **1-byte tag** derived from the destination, plus a small proof-of-work to deter spam. It is also published under a throwaway key, so it doesn't reveal the sender either.
2. A **relay** (an open-source, community-runnable server) listens for wake signals, checks the proof-of-work, and fires a Web Push to *every* device registered under that tag.
3. Your device wakes and checks whether there's actually a message for you — the service worker queries the channel's storage node over HTTPS. Only then does a notification render; message content never travels through the push system.

Push is **opt-in per channel**; your own DM inbox is registered automatically, registrations refresh every 6 hours, and the proof-of-work is bound to a 10-second epoch so wake signals can't be replayed.

The full flow, with the k-anonymity collision made visible — Alice and Charlie share tag `0x75` for different channels, so both devices wake and each verifies locally; Bob's tag doesn't match, so his device never wakes (click to zoom):

![Push notifications with k-anonymity: registration phase and wake-signal phase across sender, relay, FCM and recipients](/img/diagrams/push-k-anonymity.jpg)

*Registrations and wake signals travel over the Streamr push stream; the relay maps tags to push subscriptions and fires Web Push; each woken device checks the storage node and only renders a notification if there really is a message for it.*

The 1-byte tag is the key trick: with only 256 possible tags, many users share each one (**k-anonymity**). The relay knows "someone in bucket 173 has mail," not who. The cost is that your device occasionally wakes for someone else's message and silently goes back to sleep.

## What the push path does and doesn't learn

| Party | Learns | Does not learn |
|---|---|---|
| Relay | Tag bucket, aggregate frequency | Message content, sender, sender's IP, which user you are |
| Google / Apple | That your device runs Pombo | Content, sender, which channels/contacts you have |
| Network observer | Wake-signal timing (see caveat below) | Content, sender, recipient beyond the tag bucket |

The honest residuals: platform push tokens inherently tell Google/Apple *that* you use Pombo. The relay stores your push token keyed to your tags, so it can link the notifications one device receives over time (though not who that device belongs to). The wake-verification step means the storage node sees which stream your device polls, and when. And while the push stream's subscribe permission is restricted to the relay, that restriction is a network-level permission rather than encryption — wake signals travel unencrypted, so a determined observer running a modified node could still watch their timing. The design assumes this: even a full view of the stream yields only tag buckets and timestamps. Small user bases also mean smaller anonymity sets.

## Platform notes

- **iOS**: notifications require the PWA to be **installed to the Home Screen** (iOS 16.4+). Safari-tab usage won't receive push.
- **Android (native app)**: uses Firebase Cloud Messaging. Battery optimizations (Doze, Adaptive Battery) can delay delivery by minutes — exempting Pombo from battery optimization helps.
- **Relay availability**: today one community relay serves the network; if it's down, push pauses (messages are unaffected — they're waiting on the network). The relay is open source and anyone can run one — see [Run a push relay](../operators/run-a-relay.md).

## In-app notifications and invites

Notifications *inside* Pombo (such as channel invites) don't use the push system at all — they're delivered through your DM inbox, end-to-end encrypted like any DM.
