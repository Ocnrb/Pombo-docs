---
id: install
title: Install Pombo
description: How to install Pombo on the web, Android and iOS.
---

# Install Pombo

## Web (any platform)

Pombo runs entirely in your browser at **[app.pombo.cc](https://app.pombo.cc)** — nothing to download.

To install it as an app (recommended, and required for push notifications on iOS):

1. Open [app.pombo.cc](https://app.pombo.cc#install).
2. Use your browser's **Install app** / **Add to Home Screen** option.
   - **Chrome / Edge (desktop and Android):** look for the install icon in the address bar, or *Menu → Install app*.
   - **Safari (iOS 16.4+):** *Share → Add to Home Screen*. Push notifications on iOS only work for installed PWAs.

The installed app works offline for your local data and reconnects to the network when you're back online.

## Android (native app)

A native Android app (Kotlin + Jetpack Compose) is available from the [GitHub repository](https://github.com/Ocnrb/Pombo). It is wire-compatible with the web app — same account format, same channels, same encryption — and uses Firebase Cloud Messaging for push notifications.

Requirements: Android 8.0 (API 26) or newer.

## After installing

Your next step is creating an identity — see [Your identity and keys](identity.md). There is no sign-up: the app generates a keypair locally the first time you use it.
