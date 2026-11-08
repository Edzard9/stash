# Example: an accompanied session, as this skill runs it

Inter-VLAN Routing practicum, Cisco Packet Tracer, 30 October 2026.
The student built the topology himself from a broken starting state
and sent a screenshot at each stuck point. The companion staged the
work and waited for each validation before continuing.

## Stages and their proofs

1. Addressing and VLAN assignment per the module. Proof: each PC's
   configuration matched the module's table, checked against the
   screenshots.
2. Trunk and gateway configuration (router-on-a-stick, one
   subinterface per VLAN). Proof: ping from PC-A (VLAN 10) to its
   gateway 192.168.10.1, 0% packet loss.
3. Cross-VLAN validation. Proof: ping from PC-A to PC-B
   (192.168.20.10, VLAN 20), 0% packet loss, and a tracert showing
   exactly 2 hops: gateway, then destination.

## What the session also produced

- A same-week UTS session on a two-topology EtherChannel exercise
  ran on the same discipline and passed both topologies, including
  a redundancy check: one member cable of the port-channel removed,
  ping still 0% loss.
- One assistant misdiagnosis during the UTS help (a friend's
  addressing was blamed when the actual fault was a port-channel
  whose members had never been channel-grouped). It was retracted
  plainly, with the corrected cause and a revert message the student
  could forward. That retraction is why "diagnose from the evidence
  on screen" and the port-channel field note are in the skill.
