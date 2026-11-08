---
name: cloudflare-worker
description: Build and maintain Cloudflare Workers with D1 in the shape that survived production in a real temp-mail service: API structure, D1 migrations and their classic trap, secret management, scheduled cleanup, and email parsing that handles real-world mail. Use when the user builds or debugs a Worker, a D1 database, or an Email Worker, or says "cloudflare worker", "bikin worker", "d1 database", "wrangler". Do NOT use for Pages-only static sites or non-Cloudflare backends.
license: MIT
---

# Cloudflare Worker

This skill is the distilled shape of grmail, a temp-mail service that
runs in production on Workers + D1, including the failures that
taught each rule: a database that answered "no such table" because
its migration had never actually run, and HTML mail rendering as raw
base64 soup because the parser never decoded it. The patterns are
small because the platform rewards small.

## Project shape

- One Worker, route-based: a tiny router mapping method + path to
  handlers, no framework. Split handlers by resource in separate
  modules from the start; a single 2,000-line index file is the
  first refactor you will be forced into.
- `wrangler.toml` declares the D1 binding, routes, and cron triggers.
  Bindings are the only way the code touches the platform; no global
  state survives a request, so anything shared goes in D1 or KV.
- Public endpoints and admin endpoints are separate route groups
  with separate auth checks, enforced in the router, not remembered
  per handler.

## D1 discipline

- **Migrations are files, applied explicitly, verified after.** The
  classic trap: the code deploys fine, the first query fails with
  `no such table`, because creating a migration file is not running
  it. After every migration: apply it to the real database, then run
  one probe query against the new schema before deploying code that
  needs it.
- Schema changes are new migrations, never edits to applied ones.
- Every list query is bounded (LIMIT) and every inbox-style table has
  a cleanup path: a cron trigger deleting expired rows, because a
  temp-data service without expiry is a storage bill with a roadmap.
- Store timestamps as epoch integers; format at the edge.

## Secrets and auth

- Secrets are Worker secrets set through the deploy tooling, never
  variables in the repo and never values in chat. The agent sets up
  the plumbing; the owner types the secret.
- Admin auth is a header or a proper session, never a password in a
  query string: URLs get logged, shared, and screenshotted.
- API keys, when issued, are bound to the resource they were issued
  for, and revoking a key retires what it created or the revocation
  is theater. (These last two are written down because an early
  version of the reference service got both wrong; the review found
  it, and the lesson is cheaper in a skill than in a service.)

## Email Workers (if mail is involved)

- Parse defensively: real mail arrives as nested MIME with base64 and
  quoted-printable parts. Decode transfer encodings on intake, and
  decode again defensively on read, so mail stored before a parser
  fix still renders. The base64 bug above lived exactly at this seam.
- Extract the OTP and the confirmation link as first-class fields at
  intake time; the UI should never have to re-parse a body to find a
  code.
- Keep the raw message. Storage is cheap; an unparseable email you
  discarded is a support ticket you cannot answer.

## Verification (before calling it done)

- The deployed Worker answers its health route.
- Each new endpoint is exercised once against the real D1, not a
  local imitation, including the error path (missing field, wrong
  key).
- The migration probe query passes and the cron trigger is listed
  in the deployed configuration.
