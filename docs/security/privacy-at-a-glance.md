---
id: privacy-at-a-glance
title: Privacy at a glance
description: The ten answers most people came for, each with a link to the page that owns the full explanation.
---

# Privacy at a glance

One line per answer; the link owns the explanation. Underneath this page sit the documents with the full story: [Encryption](../concepts/encryption.md) explains how content is protected, the [privacy model](../concepts/privacy-model.md) explains what an observer can see, the [threat model](threat-model.md) says what an attacker can achieve, and the [privacy policy](/legal/privacy-policy) is the legal statement of what leaves your device and who receives it.

**Can Pombo read my messages?** No — structurally: there is no server where messages pass in the clear, and open channels are public rooms by design. → [Encryption](../concepts/encryption.md)

**Can anyone see who I DM?** No — what's visible is your inbox's timing and volume, never the correspondents. → [Sealed sender](../concepts/encryption.md#sealed-sender), [threat model](threat-model.md#visible-metadata)

**Is Pombo anonymous?** No — pseudonymous with strong wire privacy; separation of contexts means separate accounts. → [Anonymity = another account](../concepts/privacy-model.md#anonymity--another-account)

**Who sees my IP address?** Network peers, the storage node you read history from, RPC providers, The Graph, and the host behind any ENS avatar you view (that last one has an off switch). → [Threat model](threat-model.md#visible-metadata)

**Can storage nodes read what they store?** No — ciphertext, except open channels, which are plaintext for everyone. → [Storage nodes](../concepts/storage-and-sync.md#storage-nodes)

**What ends up on the blockchain, permanently?** Channel creation, membership and bans in contract-backed channels, and subscription payments — never content. → [Honest limits](../concepts/channel-access.md#honest-limits)

**What does enabling notifications reveal?** Google learns your device runs Pombo; the relay stores a push token it cannot link to your identity or channels. → [Push notifications](../concepts/notifications.md)

**What does device sync upload?** A snapshot of your state, encrypted to your own key, in your own inbox. → [Cross-device sync](../concepts/storage-and-sync.md#cross-device-sync)

**What happens if my key leaks?** The account is the attacker's too — there is no revocation, and no forward secrecy in DMs. → [The forward-secrecy trade](../concepts/encryption.md#what-that-costs-no-forward-secrecy-in-dms)

**What does the Pombo project itself hold?** Three things: encrypted history on its default storage cluster, your push token if notifications are on, and mail you send to privacy@pombo.cc. → [Privacy policy](/legal/privacy-policy)
