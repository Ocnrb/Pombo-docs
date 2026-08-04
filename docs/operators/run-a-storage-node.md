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

Pombo's clients run in browsers, and browsers are strict about what they'll fetch. For your node to be usable from the Pombo web app, its public endpoint **must** be:

- **HTTPS** with a valid certificate,
- on a **real hostname** — not an IP literal, not `localhost`,
- publicly reachable.

An `http://` endpoint or a bare IP will simply never be contacted by the web client. Register this HTTPS URL as the node's metadata so clients can discover it on-chain.

## Setup outline

1. **Cassandra first.** Install Cassandra 4.1.x and create the keyspace and tables the storage plugin expects — the plugin does **not** auto-create its schema. The schema (keyspace plus `bucket` and `stream_data` tables) is documented in the Streamr storage plugin docs.
2. **Streamr node.** Install and configure the node with the storage plugin enabled, pointed at your Cassandra, with an Ethereum identity (private key) for the node.
3. **TLS proxy.** Put nginx/Caddy with a certificate in front of port 8002. Never expose 8002 itself publicly.
4. **Firewall.** Open only: SSH, 80/443 (proxy), and the Streamr P2P port (default 13456/tcp). Cassandra's ports (7000, 9042, 7199) must never be publicly reachable.
5. **Register on-chain** so streams can be assigned to your node, and verify with the Streamr CLI:

```bash
npx -p @streamr/cli-tools streamr storage-node show <yourNodeAddress> --env polygon
```

Channel owners can then select your node's address when creating a channel in Pombo.

## Operational realities

Lessons from running Pombo's own cluster:

- **Retention is not enforced automatically.** Streams declare a retention period, but expired data must be actively purged — verify your node version's expiry job actually works, and monitor disk usage.
- **If you run replicated Cassandra, schedule repairs.** Run `nodetool repair -pr <keyspace>` regularly (daily, staggered across nodes). Unrepaired replicas silently diverge — the symptom is *intermittently* missing history, because alternate reads hit alternate replicas. This is the most confusing failure mode you will meet.
- **Back up the node's private key.** The node's identity is how streams are assigned to it; losing it orphans every stream pointed at your node.
- Uptime matters more than specs: channels assigned to your node depend on it for history. A modest VPS with reliable disk beats a big machine that reboots weekly.
