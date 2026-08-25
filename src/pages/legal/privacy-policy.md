---
title: Privacy policy
description: What data leaves your device when you use Pombo, and who receives it.
---

# Privacy Policy

**Effective date:** 25 August 2026
**Last updated:** 25 August 2026

Pombo is built so that we cannot see your messages, your contacts, or who you
talk to. This document explains what that means in practice, and it is careful
to describe the places where the design has limits. A privacy policy is worth
what it admits, so the limits are stated as plainly as the protections.

This is the legal statement of what data leaves your device and who receives it.
It is written to be read on its own. If you want to know *how* the protections
work rather than what they cover, the [privacy model](/concepts/privacy-model)
explains the mechanisms and the [threat model](/security/threat-model) sets out
what an attacker can achieve. Where those documents and this one describe the
same thing, this one governs.

## 1. What this policy covers

This policy covers the Pombo web application at `app.pombo.cc`, the Pombo
Android application, and the websites `pombo.cc` and `docs.pombo.cc`.

Pombo is a client for open infrastructure that it does not own. The Streamr
Network, the Polygon blockchain, storage nodes and RPC providers are run by
whoever chooses to run them, under their own terms, and this policy does not
cover them. Where using Pombo causes data to reach them, it says so.

The project does run some of that infrastructure itself, as a service rather
than as part of the application: a storage cluster and a push relay. Section 9
lists them, and they are covered by this policy like anything else we operate.

"Pombo", "we" and "us" in this document mean the project that publishes the
applications and websites listed above. Pombo is an open source project rather
than a company, and it holds no user data of its own. Questions about this
policy, and any request relating to your data, reach the project at the address
in section 11.

## 2. There is no account

Pombo does not have accounts. Your identity is a cryptographic key pair
generated on your device. We do not ask for an email address, a phone number,
a name, or any other identifier, and we do not assign one to you.

This means we have no user database, and no way to look you up. It also means
that if you lose your key and your backup, nobody can restore your identity for
you, including us.

## 3. What is stored on your device

The following is held locally and never sent to us:

- Your private key, in an encrypted keystore protected by the password you set.
- Messages you have sent and received, and the channels you have joined.
- Your contacts and any local names you gave them.
- Channel encryption keys.
- Cached ENS names and avatars.
- Backups you export, until you move or delete them.

Uninstalling the application, or clearing site data in your browser, erases all
of it. We cannot recover it.

## 4. What leaves your device, and who can see it

### 4.1 The peer-to-peer network can see your IP address

Pombo delivers messages over the Streamr Network, a peer-to-peer network. Your
device connects **directly to other participants**. Message content is
encrypted end to end and those participants cannot read it, but they can observe
the IP address you connect from, as is inherent to any direct connection.

If your IP address must not be visible to other participants, use Pombo through
a VPN or a network that does not identify you. There is no proxy layer between
you and the network that would hide it for you.

### 4.2 Storage nodes hold encrypted history

Pombo is a client for open infrastructure. Message history is kept by Streamr
storage nodes, which anyone can run: they are not part of the application, and
the application has no privileged relationship with any of them.

**We operate one of those nodes, and it is the one a channel uses unless its
owner picks another.** It is a two-server cluster, offered because a network
with no reachable storage is not much use to anyone, and it is a service we run
rather than a component of the app. Channel creation shows the choice, names the
node, and explains how to point a channel at your own cluster or a third
party's instead.

Whichever node a channel uses, what is stored is encrypted and its operator
cannot read it. What that operator does see is stream identifiers, message
sizes, and timing. When the node is ours, we see exactly that and nothing more.

How long history is kept is set by the channel's owner, between one and 365
days, and it is enforced by the node rather than by us.

### 4.3 The blockchain is public and permanent

Creating a channel, joining a gated channel, and paying for access are
transactions on the Polygon blockchain. They are public, permanent, and cannot
be deleted or amended, by us or by anyone.

Blockchain addresses are pseudonymous, not anonymous. Anyone who links an
address to a person can then see everything that address has done. Payments for
paid channels go directly to the channel owner; Pombo takes no fee.

### 4.4 Channel discovery

Browsing channels queries an indexing service, The Graph, over the internet.
That service receives your IP address and the queries you make, which reveals
which channels you look at. You can supply your own API key in Settings, which
changes who your queries are attributed to but not that they are made.

### 4.5 Blockchain access and ENS names

Reading gate conditions, estimating fees, and sending transactions use public
RPC endpoints, which receive your IP address and the addresses you query. The
endpoints are listed in the application and can be changed in Settings.

Looking up the `.eth` name of someone you see in a channel is sent with cover
traffic, so the provider learns that you resolved some address but not which
one. The [privacy model](/concepts/privacy-model) describes how.

Looking up a name you typed yourself, to start a direct message or send an
invitation, is **not** covered. The provider sees the exact name you asked for,
which reveals who you intend to contact. This is inherent to resolving ENS names
through someone else's node, and the only complete answer is to run your own;
we mention it because most applications leave it unsaid.

### 4.6 Push notifications

Push notifications are optional and off until you enable them.

When enabled, wake signals reach your device through the platform push service
your device already uses: Google's Firebase Cloud Messaging on Android, and your
browser's push service on the web. That service handles delivery and can see
that a message was delivered to your device, but not its content, its sender, or
which channel it came from.

The Pombo relay that triggers those signals cannot determine the recipient, the
sender, or the channel. What reaches it is an anonymous tag, one of a small
number shared by many devices, and the [privacy model](/concepts/privacy-model)
describes how that works.

To deliver anything at all, the relay does have to store your device's push
token, alongside that tag and the times the registration was created and last
refreshed. A push token identifies a device, not a person: it is issued by
Google or by your browser, it carries no name, address or account, and the relay
holds nothing that links it to your Pombo identity or to any channel. It is
still a persistent identifier, so we name it here rather than leave you to
assume the relay stores nothing. Turning notifications off removes it.

On Android, the Firebase Messaging component sends an installation identifier to
Google in order to receive messages at all. This is a property of using the
platform's push service and applies whenever notifications are enabled.

### 4.7 Profile pictures set by other users

If someone you see in a channel has set an ENS profile picture, your device
loads that image from wherever their ENS record points, which is a server of
their choosing. That server receives your IP address and browser information.
Images stored on IPFS are fetched through a public gateway, which receives the
same.

This is worth stating plainly: a person can set their profile picture to an
address on a server they control and thereby learn the IP address of everyone
who views their messages. Pombo requires such images to be served over HTTPS,
which protects the request in transit but does not hide who made it.

You can turn this off. Settings has an **ENS Avatars** control, under Content,
that stops remote profile pictures from loading and shows the locally generated
identicon instead. Turning it off closes the request entirely, everywhere an
avatar is drawn, including the account screens shown before you unlock and the
pictures attached to notifications. It is on by default, because most people
want to see the pictures.

### 4.8 Embedded video

If you play a video embedded in a message, it is loaded from YouTube in
privacy-enhanced mode. Nothing is loaded from YouTube until you press play.

### 4.9 Website hosting

`app.pombo.cc`, `pombo.cc` and `docs.pombo.cc` are served by GitHub Pages.
GitHub keeps ordinary web server access logs, which include IP addresses, under
its own privacy statement.

## 5. What Pombo does not do

- No analytics, no telemetry, no crash reporting, no usage measurement.
- No advertising, no advertising identifiers, no tracking across sites or apps.
- No profiling, and no inference about you from your behaviour.
- No selling or sharing of personal data. The little we hold is listed in
  section 9, and none of it is passed on to anyone.
- No server that holds your messages, your contact list, or your keys.

There is no third-party analytics or tracking code in the Pombo applications.

## 6. Third parties your use of Pombo reaches

Most of these are outside the European Economic Area, so using Pombo sends your
IP address to countries whose data protection law differs from the EU's. GitHub
and Google are United States companies. For the rest we cannot tell you where
your data goes, and saying otherwise would be an invention: an RPC or indexing
gateway answers from whichever edge location its network chooses, and the
peer-to-peer network connects you to whoever happens to be carrying the same
channel, anywhere in the world. Each of these parties operates under its own
terms and its own transfer safeguards; we are not a party to that relationship
and cannot vouch for it.

| Party | What it receives | When |
| --- | --- | --- |
| Other network participants | Your IP address | Whenever the app is connected |
| The storage node a channel uses, ours by default | Encrypted content, stream ids, sizes, timing | For channels with retention |
| The Polygon blockchain | Your address and transactions, permanently and publicly | On-chain actions |
| The Graph | Your IP address and channel queries | Browsing and opening channels |
| RPC providers | Your IP address and the addresses you query | Gate checks, ENS, transactions |
| Google (FCM) and browser push services | Delivery of an opaque wake signal, device push token | Only if notifications are enabled |
| A user's chosen image host, or a public IPFS gateway | Your IP address and browser information | Viewing anyone with an ENS profile picture |
| YouTube | Standard embedded player data | Only if you play a video |
| Hosting providers | Web server access logs | Loading the sites |

## 7. Retention, and what we cannot delete

There is no central store of your messages, your contacts or your identity. What
the project does hold is listed in section 9, and it is small.

For the rest we want to be exact rather than reassuring:

- Channel history stays on the storage node the channel uses until its retention
  window expires, then the node purges it. It is encrypted throughout. On our
  own cluster we can see that a channel's data is there and when it will go, and
  we do not remove it early, because doing so would break the guarantee the
  channel owner chose. On any other node we have no access at all.
- Blockchain transactions are permanent. They cannot be deleted by anyone.
- Messages already delivered to other people's devices are theirs. We have no
  mechanism to reach into them.

Deleting a message in the application publishes an instruction to hide it, which
compliant clients honour. It is not a guarantee that every copy disappears, and
we do not present it as one.

## 8. Age


Pombo is not directed at children. You must be at least 16 years old to use it.

We cannot verify your age, and we want to be honest about why: verifying it
would require collecting identifying information about you, which is exactly
what this application is designed not to do. The age requirement is a condition
of use, not something we enforce technically.

## 9. Your rights

If you are in the European Economic Area or the United Kingdom, data protection
law gives you rights of access, correction, deletion, restriction, objection and
portability.

These rights are exercised against whoever holds your data. In Pombo's case,
almost everything is held by you: your messages and keys are on your own device,
and you can export, inspect and destroy them at any time without asking us.

For the parts we do not hold, we cannot act on your behalf. We cannot delete
blockchain transactions, reach into a storage node run by someone else, or
retrieve messages from other people's devices. Saying otherwise would be a
promise we could not keep.

Where the project itself operates infrastructure, we take responsibility for it.
There are four places, and they are the only ones:

- **The storage cluster** described in section 4.2, holding the encrypted
  history of every channel that uses it, for as long as that channel's retention
  window says. This is the largest of the four by far.
- **The push relay**, which stores the device push tokens described in section
  4.6, for as long as notifications stay enabled.
- **The websites** listed in section 1, whose hosting keeps access logs.
- **This mailbox.** Writing to the address in section 11 means we hold your
  message and whatever address you sent it from, for as long as it takes to
  answer you and keep a record of having done so.

None of these is a component of the application. They are services the project
runs on open infrastructure, and each of them can be replaced by someone else's
or by your own.

If you want any of that removed, ask. For the push token, turning notifications
off in the app is faster than writing to us.

We do not claim responsibility for the Streamr Network, the Polygon blockchain,
storage nodes, RPC providers or indexing services. They are independent, they
are not ours to direct, and pretending otherwise would mislead you about who can
actually act on a request.

## 10. Changes to this policy

If this policy changes we will update the effective date above. The full history
of every change is public in the repository that publishes this page, so you can
see exactly what changed and when.

## 11. Contact

Questions about this policy, and any request relating to your data, go to
**privacy@pombo.cc**.
