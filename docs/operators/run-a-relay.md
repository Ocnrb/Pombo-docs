---
id: run-a-relay
title: Run a push relay
description: Run a Pombo push relay — the easiest way to contribute infrastructure to the network.
---

# Run a push relay

The push relay bridges Streamr wake signals to Web Push (FCM/APNs). It's deliberately **blind** — it never sees message content or user identities (see [Notifications](../guides/notifications.md)) — and deliberately **cheap to run**. This is the easiest piece of Pombo infrastructure to operate.

## Requirements

- Node.js 18+
- ~50–100 MB RAM, ~100 MB disk (SQLite is embedded — no database server)
- A stable internet connection

That's Raspberry Pi territory. A home PC, a free-tier cloud VM, or the cheapest VPS you can find all work.

## Setup

```bash
git clone https://github.com/Ocnrb/Pombo
cd Pombo/extra/pombo-relay
npm install
npm run generate-keys   # writes a .env with fresh relay + VAPID keys
npm start
```

`npm test` runs a self-check. Configuration lives in `.env`:

| Variable | Purpose |
|---|---|
| `RELAY_PRIVATE_KEY` | The relay's Streamr identity |
| `VAPID_PUBLIC_KEY` / `VAPID_PRIVATE_KEY` | Web Push (VAPID) keypair |
| `VAPID_EMAIL` | Contact email included in push requests |
| `POW_DIFFICULTY` | Proof-of-work requirement for wake signals (default 4) |
| `PUSH_STREAM_ID` | The Streamr stream to listen on |
| `ADMIN_PORT` | Local admin API port (default 8000) |

## Keeping it running

Use PM2:

```bash
pm2 start index.js --name pombo-relay
pm2 save && pm2 startup
```

or Docker:

```bash
docker build -t pombo-relay .
docker run -d --restart unless-stopped -v $(pwd)/data:/app/data pombo-relay
```

The admin API (`GET /admin/stats`, `GET /admin/registrations`) on the admin port shows registration counts and delivery stats. Keep it firewalled to localhost.

## Operational notes

- **VAPID keys are the relay's identity to browsers.** If you rotate them or users switch relays, their devices must re-register for push. Back up your `.env`.
- The relay stores only push subscriptions (endpoint + tag), never message data.
- Resource usage grows very slowly with users; a single small instance comfortably serves thousands of registrations.
