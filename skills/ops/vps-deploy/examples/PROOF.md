# Worked proof: a service deployed with this skill

On 8 November 2026 a tiny Node server (`server.js` in this folder)
was deployed to the maintainer's VPS following this skill's pattern
exactly, as the skill's worked proof.

- Folder per project: `/root/projects/stash-proofs/deploy/`
- Unit: `stash-proofs.service` (below), enabled, restart on failure
- Bind: the server listens only on the server's Tailscale address,
  port 3021, recorded here as the app's port
- Archiving: not applicable yet (the service is live, not finished)

Unit as deployed:

```ini
[Unit]
Description=stash-proofs tiny proof server (tailnet only, port 3021)
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/node /root/projects/stash-proofs/deploy/server.js
WorkingDirectory=/root/projects/stash-proofs/deploy
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Verification, run in the skill's checklist order:

1. `systemctl is-active stash-proofs` returned `active`.
2. From the tailnet: `curl http://100.76.240.40:3021/` returned
   `{"service":"stash-proofs","message":"stash proofs online"}`.
3. On the public address: `curl http://94.237.70.136:3021/` returned
   nothing (connection failed), confirming the bind rule.
4. The service was left running as a standing example.
