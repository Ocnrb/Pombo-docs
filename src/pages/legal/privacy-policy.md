---
title: Privacy policy
description: What data leaves your device when you use Pombo, and who receives it.
---

# Privacy Policy

**Effective date:** 25 August 2026
**Last updated:** 25 August 2026

Pombo is built so that we cannot see your messages, your contacts, or who you
talk to. This document is the legal statement of what data leaves your device
and who receives it, and it states the limits as plainly as the protections.
If you want to know *how* the protections work rather than what they cover,
the [privacy model](/concepts/privacy-model) explains the mechanisms
and the [threat model](/security/threat-model) sets out what an attacker can
achieve. Where those documents and this one describe the same thing, this one
governs.

## 1. Who we are, and what this covers

"Pombo", "we" and "us" mean Vasco Branco, who publishes the Pombo web
application at `app.pombo.cc`, the Pombo Android application, and the websites
`pombo.cc` and `docs.pombo.cc`, and operates the services in section 4. Pombo
is an open source project rather than a company. This policy covers the
applications, websites and services named here.

It covers what we run, not what the code can be used for. Pombo is MIT-licensed:
if you build it yourself, host it somewhere else, or run your own storage node
or relay, that is your service and not ours, and whoever operates it is
responsible for it.

Pombo is a client for open infrastructure that it does not own. The Streamr
Network, the Polygon blockchain, storage nodes and RPC providers are run by
whoever chooses to run them, under their own terms, and this policy does not
cover them. Where using Pombo causes data to reach them, section 3 says so.

## 2. What we collect

Nothing, by construction. Pombo has no accounts: your identity is a
cryptographic key pair generated on your device. We do not ask for an email
address, a phone number, a name, or any other identifier, and we do not assign
one to you. We have no user database and no way to look you up — which also
means that if you lose your key and your backup, nobody can restore your
identity, including us. Nothing about you is required in order to use Pombo;
there is no field you have to fill.

There is no analytics, telemetry, crash reporting or usage measurement; no
advertising, advertising identifiers, or tracking across sites or apps; no
profiling; no automated decision-making; and no selling or sharing of personal
data. The little we hold is listed in section 4, and none of it is passed on
to anyone.

Your private key (in an encrypted keystore), your messages, the channels you
have joined, your contacts and the local names you gave them, channel
encryption keys, cached ENS data and exported backups live on your device. Uninstalling the application, or clearing site data in your browser,
erases all of it, and we cannot recover it. If you have a DM inbox, an
encrypted copy of most of that state travels to it so your other devices can
pick it up — see "Syncing between your devices" in section 3.

## 3. What leaves your device, and who receives it

Most of these parties are outside the European Economic Area, so using Pombo
sends your IP address to countries whose data protection law differs from the
EU's. GitHub and Google are United States companies. For the rest we cannot
tell you where your data goes: an RPC or indexing gateway answers from
whichever edge location its network chooses, and the peer-to-peer network
connects you to whoever happens to be carrying the same channel, anywhere in
the world. Each party operates under its own terms and its own transfer
safeguards; we are not a party to that relationship.

| Party | What it receives | When |
| --- | --- | --- |
| Other network participants | Your IP address | Whenever the app is connected |
| The storage node a channel uses, ours by default | Encrypted content, stream ids, sizes, timing, the address you read from | For channels with retention |
| The Polygon blockchain | Your address and transactions, permanently and publicly | On-chain actions |
| The Graph | Your IP address and channel queries | Browsing and opening channels |
| RPC providers | Your IP address and the addresses you query | Gate checks, ENS, transactions |
| Google (FCM) and browser push services | Delivery of an opaque wake signal, device push token | Only if notifications are enabled |
| A user's chosen image host, or a public IPFS gateway | Your IP address and browser information | Viewing anyone with an ENS profile picture |
| YouTube | Standard embedded player data | Only if you play a video |
| Hosting providers | Web server access logs | Loading the sites |

What the table cannot carry:

**The network.** Your device connects directly to other participants, who can
observe your IP address, as is inherent to any direct connection. There is no
proxy layer that would hide it for you; if your IP address must not be visible,
use Pombo through a VPN or a network that does not identify you.

**Storage nodes.** Anyone can run one; a channel uses ours unless its owner
picks another, and the choice is shown at creation. Whichever node it is, what
it stores is encrypted and its operator cannot read it; what the operator sees
is stream identifiers, sizes, timing, and — because loading history is a direct
request from your device — the address you connect from. Our own cluster does
not log connecting addresses. History is kept for 1 to 365 days, set by the
channel's owner and enforced by the node.

**The blockchain.** Creating a channel, joining a gated channel and paying for
access are Polygon transactions: public, permanent, and deletable by no one.
Addresses are pseudonymous, not anonymous — anyone who links an address to a
person sees everything that address has done. Payments for paid channels go
directly to the channel owner; Pombo takes no fee.

**Channel discovery and blockchain access.** Browsing channels queries The
Graph, which receives your IP address and the queries you make; supplying your
own API key in Settings changes who your queries are attributed to, not that
they are made. Reading gate conditions and sending transactions use public RPC
endpoints, listed in the application and changeable in Settings. Looking up the
`.eth` name of someone you see is sent with cover traffic, so the provider
learns that you resolved some address but not which one. Looking up a name you
typed yourself — to start a DM or send an invitation — is **not** covered: the
provider sees the exact name, which reveals who you intend to contact. This is
inherent to resolving ENS through someone else's node; we say it because most
applications leave it unsaid.

**Push notifications** are off until you enable them. The platform push service
(Google's Firebase Cloud Messaging on Android, your browser's push service on
the web) can see that something was delivered to your device, but not its
content, sender or channel. The Pombo relay that triggers deliveries cannot
determine any of those either: what reaches it is an anonymous tag shared by
many devices. To deliver at all, the relay does store your device's push token,
with that tag and the registration times. A push token identifies a device, not
a person — it carries no name or account, and the relay holds nothing linking
it to your Pombo identity or channels — but it is a persistent identifier, so
we name it. Turning notifications off removes it. On Android, the Firebase
Messaging component also sends an installation identifier to Google; that is a
property of the platform's push service.

**Profile pictures set by other users.** If someone has an ENS profile picture,
your device loads it from wherever their record points — a server of their
choosing, which receives your IP address and browser information (IPFS images
go through a public gateway, which receives the same). A person can point
their picture at a server they control precisely to learn who views their
messages; HTTPS is required, but that protects the request in transit, not who
made it. **Settings → Content → ENS Avatars** turns the fetch off entirely,
everywhere an avatar is drawn, and shows a locally generated image instead. It
is on by default.

**Embedded video** is loaded from YouTube in privacy-enhanced mode, and nothing
is loaded until you press play.

**The websites** are served by GitHub Pages, which keeps ordinary access logs,
including IP addresses, under its own privacy statement.

**Syncing between your devices.** If you create a DM inbox, Pombo publishes a
snapshot of your own state to it: your channel list, contacts and the local
names you gave them, blocked peers, cached ENS names, your display name, the
messages you sent and the images that went with them. This starts automatically
once the inbox exists and can be set to manual in Settings. The snapshot is
encrypted to your own key before it leaves the device; nobody else can read it,
including us and including the storage node your inbox uses (ours, unless you
chose otherwise), which holds an encrypted blob, its size, and when it arrived.

## 4. What we operate

Three places where the project holds data, and they are the only ones:

- **The storage cluster** that channels and inboxes use by default: encrypted
  channel history and encrypted device-sync snapshots, for as long as their
  retention windows say. We keep it so the history a channel's owner asked for
  is there when its members come back, on our legitimate interest in running a
  usable service.
- **The push relay**: the device push tokens described in section 3, for as
  long as notifications stay enabled, kept only to deliver the notifications
  you asked for, on the basis of your consent. Turning notifications off
  withdraws it and deletes the token.
- **This mailbox**: writing to the address in section 9 means we hold your
  message and the address you sent it from, for as long as it takes to answer
  and keep a record of having done so, on our legitimate interest in answering
  people who write to us.

Web server logs are not on the list because we do not have them: GitHub keeps
the sites' logs for its own purposes, and we can neither read nor delete them.
None of the three is a component of the application; each can be replaced by
someone else's, or by your own.

## 5. Retention, and what we cannot delete

Channel history stays on the storage node the channel uses until its retention
window expires, then the node purges it; it is encrypted throughout. On our
cluster we can see that a channel's data exists and when it will go, and we do
not remove it early, because that would break the guarantee the channel's owner
chose; on any other node we have no access at all. Blockchain transactions are
permanent and cannot be deleted by anyone. Messages already delivered to other
people's devices are theirs; we have no mechanism to reach into them.

Deleting a message in the application publishes an instruction to hide it,
which compliant clients honour. It is not a guarantee that every copy
disappears, and we do not present it as one.

## 6. Your rights

If you are in the European Economic Area or the United Kingdom, data protection
law gives you rights of access, correction, deletion, restriction, objection
and portability. These rights are exercised against whoever holds your data,
and in Pombo's case almost everything is held by you, on your own device, to
export, inspect and destroy without asking us.

For what we do not hold, we cannot act on your behalf: we cannot delete
blockchain transactions, reach into a storage node run by someone else, or
retrieve messages from other people's devices. For the three services in
section 4 we take responsibility — if you want something removed, ask (for the
push token, turning notifications off in the app is faster). If you think we
have handled your data badly, you can complain to the data protection authority
of the country where you live; the European Data Protection Board
[lists them all](https://www.edpb.europa.eu/about-edpb/about-edpb/members_en).

## 7. Age

Pombo is not directed at children, and you must be at least 16 years old to use
it. We cannot verify your age: verifying it would require collecting exactly
the identifying information this application is designed not to collect. The
requirement is a condition of use, not something we enforce technically.

## 8. Changes to this policy

If this policy changes we will update the effective date above. The full
history of every change is public in the repository that publishes this page.

## 9. Contact

Questions about this policy, and any request relating to your data, go to
**privacy@pombo.cc**.
