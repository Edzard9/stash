# Ops shelf

Skills for servers, networks, and automation.

Residents:

- `vps-deploy`, the house deployment pattern: a systemd unit per
  app, bound to the Tailscale address only, one recorded port per
  app, server disk as a desk and cloud storage as the warehouse.
  Ships a unit template and a verification checklist.
- `repo-audit`, the own-repo audit: files plus full commit history
  for secret shapes, then the quiet exposures (commit author emails,
  README screenshots, issue text). Includes the anonymized summary
  of a real 15-repo audit.
- `homelab-vlan-segmentation`, home network segmentation design and
  firewall rule order for UniFi, pfSense/OPNsense, and MikroTik.
  Adapted from the ECC collection (MIT).
