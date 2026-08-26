---
id: client-security
title: Client security
description: How the app itself is hardened — CSP, message sanitization, clickjacking defense, and keeping the key away from the UI.
---

# Client security

The [threat model](threat-model.md) describes what an attacker can achieve against the protocol. This page is about the client as an attack surface: injected code, hostile message content, framing, and the boundary between the UI and your key.

## No third-party code ever runs

The web app's Content Security Policy makes a single bet: **every script is bundled and served from the app's own origin**. External scripts, inline scripts and `eval` are refused, so compromising a CDN or injecting a `<script>` tag buys an attacker nothing — stealing keys requires compromising the app's code or its delivery. One inline-script hash is allowed, and it matches only the live-reload snippet a local dev server injects; production pages have no inline scripts at all.

Because the app is served by GitHub Pages, which cannot attach response headers, the policy travels as a `<meta>` tag in the page itself.

Outbound connections are deliberately **not** restricted: custom RPC endpoints and custom storage nodes are user-configurable, and storage nodes resolve from an on-chain registry, so a fixed allowlist is incompatible with user-chosen infrastructure. (ENS avatars can live on any HTTPS host, so image loading is open for the same reason.) What that openness costs if the origin is ever compromised is stated in the [threat model](threat-model.md#the-web-clients-security-policy).

## Rendering hostile messages

Anything another user controls — messages, display names, channel descriptions — is escaped on arrival, and the render pipeline then builds its own limited HTML on top: links, YouTube embeds, emoji wrappers. Nothing a sender writes reaches the page as markup.

As defense in depth, every string is passed through **DOMPurify** at the moment it becomes DOM. The whitelist is exactly what the pipeline emits and nothing more, and its edges are deliberate:

- **`style` is not on the attribute whitelist.** The CSP has to allow inline styles for the app's own UI, so the sanitizer is the barrier against overlay and `background:url()` tricks smuggled through message content.
- **`data-*` attributes are refused.** The UI dispatches events by data attributes, so letting content define them would let content wire itself into the app's behaviour.
- **Every link is rewritten** to open in a new tab with `rel="noopener noreferrer"`, whatever the sender wrote.
- **The only iframe that survives is a YouTube privacy-enhanced embed**; any other `src` is stripped.
- Names and descriptions go through a stricter profile that allows **no HTML at all**.
- If the sanitizer ever throws, rendering falls back to full escaping — plain text, never raw HTML.

## Clickjacking

GitHub Pages cannot send `X-Frame-Options` or `frame-ancestors`, so the framing defense is a small script loaded first in `<head>`: if the app finds itself inside another page's frame, it stops loading and blanks the page, leaving only a link to open app.pombo.cc directly. It blanks rather than navigating away because sandboxed iframes can block top navigation, but they cannot keep a document from emptying itself.

## The key stays away from the UI

- On the **web**, the private key lives in a scrypt-encrypted keystore and is unlocked into memory by your password — see [what is protected locally](../concepts/encryption.md#what-is-protected-locally).
- On **Android**, the UI is native and the protocol stack runs in a headless WebView — and that WebView **never receives the private key**. It is handed the address and the public key, and every signature is requested from a native signing oracle that refuses opaque digests: it only signs payloads it can parse and check. Code running inside the WebView, even fully compromised, cannot exfiltrate the key — only ask the oracle to sign things the oracle understands.
