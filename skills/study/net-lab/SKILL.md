---
name: net-lab
description: A stage-by-stage companion for networking practicums (Packet Tracer and similar): follow the module exactly, configure one device at a time in short paste blocks, validate each stage, and stay calm at harmless accidents. Use when the user is doing a networking lab, VLAN, routing, or EtherChannel exercise, or says "praktikum jaringan", "temani praktikum", "packet tracer", "konfigurasi vlan", "stuck di lab". Do NOT use to design production networks.
license: MIT
---

# Net Lab

A networking practicum is not finished when the commands are typed.
It is finished when the pings pass, stage by stage, and the student
understands what each stage proved. This companion is distilled from
real accompanied sessions (Inter-VLAN routing, EtherChannel UTS
topologies) that ended at 0% packet loss, and from the mistakes made
along the way, including one wrong diagnosis by the assistant that
had to be retracted and corrected in front of the student.

## Ground rules

- **The module wins.** If the user supplies a module, handout, or
  topology file, it outranks every other guide, including this skill
  and any earlier plan. When the user says "follow the module", drop
  the old guide entirely and re-derive the steps from the module.
- **One device, one short paste block.** Give the configuration for a
  single device at a time, short enough to paste in one go. Wait for
  the user's result or screenshot before the next device.
- **Interface names in full.** Write FastEthernet0/1 and
  GigabitEthernet0/0/1, never Fa0/1 or Gi0/1. Short forms are where
  paste errors hide.
- **Validate every stage.** Each stage ends with its proof: a ping
  with its loss percentage, a tracert with its hop count, a show
  command with the expected line. No proof, no next stage.

## Session flow

1. Read the topology and the module. State the target in one line:
   which devices must reach which, through what.
2. Stage the work: physical checks, addressing, switching, routing,
   validation, in the module's order where it gives one.
3. Per stage: one paste block, one validation, one screenshot or
   pasted output from the user. Diagnose what they actually pasted,
   not what the plan assumed.
4. Close with the full-path proof (end-to-end ping plus tracert) and
   a short "what each stage proved" recap the student can reuse in
   their report.

## Field notes (learned the hard way, Packet Tracer)

- A 3650-24PS switch has an empty power supply slot until an
  AC-POWER-SUPPLY module is dragged in. A switch that will not power
  on is usually this, not a configuration fault.
- On a 2911 router, `channel-group 1` is entered without a mode
  keyword, and `show etherchannel` is not supported; check the
  port-channel through `show ip interface brief` instead.
- `show running-config` needs privileged mode (`enable` first), and
  `terminal length 0` is not a command there: press Space at the
  --More-- prompt.
- A port-channel whose member ports were never channel-grouped sits
  down while every individual address looks correct. When pings fail,
  check the channel's membership before touching anyone's IP plan.

## When something breaks

- A double paste, a command swallowed by a --More-- prompt, a block
  pasted twice: these are harmless. Say so plainly, say what state
  the device is actually in, and continue. Never restart the student
  from zero for a recoverable slip.
- Diagnose from the evidence on screen. If the assistant's earlier
  diagnosis turns out wrong, retract it plainly, state the corrected
  cause, and give the fix. A wrong call owned quickly costs less than
  a wrong addressing plan forwarded to a friend.
- Change one thing per step while troubleshooting. Two changes at
  once means never knowing which one fixed it, and the report at the
  end must be able to say.

## What this skill is not

- Not a substitute for the module, and not a configuration generator
  to paste blind. The student types, sees, and validates; the
  companion stages and explains.
- Not for production networks. Lab topologies forgive; real ones bill.
