---
name: vps-deploy
description: Deploy a small app on a personal VPS the house way: a systemd service, bound only to the Tailscale interface, a preview port for review from a phone, and archiving of finished work to mounted cloud storage. Use when the user wants to deploy, host, or expose a project on their VPS, or says "deploy ke vps", "pasang di vps", "jalankan sebagai service", "host this". Do NOT use for production multi-tenant hosting or for changing the server's security posture without the owner's explicit go-ahead.
license: MIT
---

# VPS Deploy

A personal VPS earns its keep when deploying a project takes ten
minutes and undoing it takes one command. This is the deployment
pattern behind a dozen small services on one such server (dashboards,
previews, simulators), and its rules exist because each was broken
once: a service bound to the public internet by default, a process
that died with the SSH session, a preview nobody could open from a
phone.

## The pattern

1. **A folder per project** under one workspace root on the server.
   Nothing deploys from a home directory or a temp path.
2. **A systemd unit per app**, so the process is supervised,
   restarts on failure, starts on boot, and survives the shell that
   launched it. Template: `assets/app.service` in this folder.
   Long-running agent or build jobs follow the same rule: launch
   them as transient units, never as a bare backgrounded process
   (those die silently, about a minute in, with a clean log).
3. **Bind to the tailnet address only.** The service listens on the
   server's Tailscale IP, never on 0.0.0.0, unless the owner has
   explicitly decided this one is public. Private by construction
   beats private by firewall rule, because the rule can be lost and
   the bind cannot.
4. **One port per app, recorded.** Pick the next free port in the
   owner's range, write it in the project notes, and hand the owner
   the full URL (tailnet IP plus port) for review. The owner reviews
   from their phone over Tailscale; screenshots from the agent's
   browser are not the review.
5. **Disk is temporary, archive is permanent.** Server SSD space is
   a desk, not a warehouse. Finished or paused projects are archived
   to the mounted cloud storage and removed from the server; the
   archive location is written in the project notes before deletion.

## Verification checklist (every deploy, in order)

- The unit is active (`systemctl is-active <name>`) after a deliberate
  restart, not just after the first start.
- The app answers on its tailnet URL with the expected content, from
  a fresh request.
- The app does NOT answer on the server's public IP. Check it; do not
  assume the bind took.
- Logs show a clean start with no permission or path errors.
- The handover to the owner is the URL, the port, the unit name, and
  the one command that stops it.

## Change discipline

- Explain any change to the server itself (new packages, new cron
  entries, firewall or SSH changes) and get the owner's go-ahead
  before applying it. A sound idea installed unasked is still an
  unasked install; this rule exists because it happened once and the
  work had to be removed and verified gone.
- Secrets live in the service's environment file with owner-only
  permissions, never in the unit, the repo, or the chat.
- Removing a service is the full reverse: stop, disable, delete the
  unit, reload systemd, confirm the port no longer answers.
