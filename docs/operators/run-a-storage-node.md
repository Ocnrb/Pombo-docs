---
id: run-a-storage-node
title: Run a storage node
description: Operate a Streamr storage node that Pombo channels can use for message persistence.
---

# Run a storage node

Storage nodes archive stream history so channels and DM inboxes work asynchronously. Pombo channel owners can point their channels at **any Streamr storage node** — including yours. This is a heavier commitment than a [push relay](run-a-relay.md): it's a database-backed, always-on service.

:::info
A storage node is standard Streamr infrastructure, not Pombo-specific software. The authoritative reference is the [Streamr documentation](https://docs.streamr.network); this page covers the setup profile that makes a node usable from Pombo.
:::

## Components

A production storage node stack:

- **Streamr node** with the storage plugin (Node.js), exposing its HTTP API locally (default port 8002)
- **Apache Cassandra 4.1.x** (on Java 11) as the message store
- **A reverse proxy (nginx or Caddy) terminating TLS** in front of the node's HTTP API

## The web-safe profile (required for Pombo)

These requirements are set by the strictest Pombo client — the web app, which runs in a browser and is bound by browser rules about what it may fetch. A node that meets them works for every client, the Android app included. Your node's public endpoint **must** be:

- **HTTPS** with a valid certificate,
- on a **real hostname** — not an IP literal, not `localhost`,
- publicly reachable,
- answering with **CORS headers**: `Access-Control-Allow-Origin: https://app.pombo.cc` (plus `Vary: Origin`), configured on the reverse proxy.

An `http://` endpoint or a bare IP will simply never be contacted by the web client, and without the CORS header the browser blocks every request even when everything else is right — the most common "it should work but doesn't" case (the Android app is not subject to CORS, so a node failing only that check still appears to work from Android — easy to miss when testing). Register the HTTPS URL as the node's metadata so clients can discover it on-chain.

## Setup outline

1. **Cassandra first.** Install Cassandra 4.1.x and create the keyspace and tables the storage plugin expects — the plugin does **not** auto-create its schema. The schema (keyspace plus `bucket` and `stream_data` tables) is documented in the Streamr storage plugin docs.
2. **Streamr node.** Install and configure the node with the storage plugin enabled, pointed at your Cassandra, with an Ethereum identity (private key) for the node.
3. **TLS proxy.** Put nginx/Caddy with a certificate in front of port 8002. Never expose 8002 itself publicly.
4. **Firewall.** Open only: SSH, 80/443 (proxy), and the Streamr P2P port (13456 by default — check your node config; the storage plugin may use an additional WebSocket port). Cassandra's ports (7000, 9042, 7199) must never be publicly reachable.
5. **Register on-chain** so clients can discover your endpoint, and verify:

```bash
npx -p @streamr/cli-tools streamr storage-node register "https://your-node.example" \
  --private-key <nodePrivateKey> --env polygon

npx -p @streamr/cli-tools streamr storage-node show <yourNodeAddress> \
  --private-key <nodePrivateKey> --env polygon
```

A quick self-check from the outside: the certificate is valid, and `curl -I -H "Origin: https://app.pombo.cc" https://your-node.example/...` returns the `Access-Control-Allow-Origin` header.

Channel owners can then select your node's address when creating a channel in Pombo.

## Operational realities

Lessons from running Pombo's own cluster:

- **Retention is not enforced automatically.** Streams declare a retention period, but expired data must be actively purged — and the bundled `delete-expired-data` job in `@streamr/node` 103.3.1 is broken, so run your own purge job and monitor disk usage.
- **If you run replicated Cassandra, schedule repairs — and use full repairs.** Run `nodetool repair -full -pr <keyspace>` regularly (daily, staggered across nodes). Incremental repair (the default without `-full`) marks SSTables as repaired into a separate compaction pool, so tombstones never meet their data and disk space is never reclaimed. Unrepaired replicas also silently diverge — the symptom is *intermittently* missing history, because alternate reads hit alternate replicas. This is the most confusing failure mode you will meet.
- **Pombo clients probe an optional `format=metadata` query** that vanilla nodes answer with HTTP 400 — that's fine, the client falls back automatically. Nodes patched to support it serve file-transfer verification dramatically faster, but no action is required.
- **Back up the node's private key.** The node's identity is how streams are assigned to it; losing it orphans every stream pointed at your node.
- Uptime matters more than specs: channels assigned to your node depend on it for history. A modest VPS with reliable disk beats a big machine that reboots weekly.
