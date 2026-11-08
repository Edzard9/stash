---
name: repo-audit
description: Audit your own public repos for leaked secrets and quiet exposures before the world finds them: scan files and full commit history for API keys, tokens, private keys, .env files and hardcoded passwords, then check the leaks that are not code (commit author emails, screenshots in READMEs, hostnames). Use when the user wants to check a repo is safe to share, says "audit repo", "cek repo aman", "scan for secrets", "periksa kebocoran". Do NOT use to audit other people's repos for their secrets.
license: MIT
---

# Repo Audit

Nobody finds their own leaked API key by reading their repo. They find
it in a stranger's screenshot, or in a bill. This audit exists because
a real pass over 15 public repos found zero leaked keys, and still
found two real exposures hiding outside the code: the owner's private
email as the commit author on nearly every commit, and a README
screenshot showing a server hostname and service list. Secrets are
only half the audit. This skill is the whole checklist, in order.

## Ground rules

- Audit only repos the user owns or is authorized to audit.
- Report values by type and location, never reproduce a found secret
  in the report, the chat, or any file. "A Stripe-shaped key in
  config.js, line 12, present since commit a1b2c3d" is the full
  detail. The key itself never travels.
- History counts. A secret deleted in the latest commit is still
  public in every earlier one. The audit covers all of git history,
  not the working tree alone.

## Pass 1: files and history, secret shapes

Search current files and every commit for:

1. Credential shapes: API key and token patterns (sk-, AKIA, ghp_,
   xox, Bearer values), `password =`, `secret =`, connection strings
   with embedded credentials.
2. Key material: files named `*.pem`, `*.key`, `id_rsa*`, anything
   under `.ssh/`, and private-key headers inside any file.
3. Environment files: `.env` and variants, committed config with real
   values where a `.env.example` was intended.
4. Infrastructure identifiers in code: production IPs, internal
   hostnames, database hosts, bucket names that are not meant to be
   public.

Use the search tooling available to you; the point is coverage of all
history, not a specific scanner. Note false positives as such
(example keys, test fixtures) instead of deleting them from the
report.

## Pass 2: the quiet exposures

1. **Commit author emails.** List the author emails across history.
   A private address used as author is public data on every clone.
   The fix is forward-looking: enable the host's "keep my email
   private" setting and use the provided noreply address for future
   commits. Rewriting published history is a separate, explicit
   decision, never a silent side effect of an audit.
2. **README and docs media.** Read every screenshot and image in the
   README and docs as an attacker would: hostnames, usernames, file
   paths, IP addresses, dashboard contents, browser tabs, notification
   text. List what each image discloses.
3. **Issue and PR text.** Secrets and internal details get pasted into
   issues during debugging. Scan open and closed issues for the same
   shapes as Pass 1.
4. **Descriptions and metadata.** Repo description, homepage field,
   and release notes sometimes carry internal URLs. Read them too.

## The report

Per repo, in this shape:

```
Repo: <name>
Files + history: clean / findings (type, file, since which commit)
Author emails: <addresses, flagged if private>
Media disclosures: <image, what it shows>
Issues/PRs: clean / findings
Verdict: safe to share / fix first (list)
```

Close with the fixes in priority order: rotate anything real that
leaked (a found key is a burned key, deletion is not rotation), then
the forward-looking settings, then the media replacements.

## What this skill is not

- Not a penetration test and not a code review. It answers one
  question: what does this repo disclose that its owner did not mean
  to publish?
- Not permission to rewrite history, force-push, or rotate keys on
  the agent's own initiative. Those are the owner's calls, made with
  the report in hand.
