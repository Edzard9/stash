# Example: parse-email worker

A minimal Worker built with this skill's shape (8 November 2026):
a tiny router in `index.js`, a `GET /health` route, and
`POST /api/parse-email`, which accepts a JSON body describing a
message and returns the decoded text plus the extracted 6-digit OTP
when present. It exists to demonstrate the skill's signature rule:
decode transfer encodings on intake.

`test.mjs` runs the handler under Node with real Request objects
(no deployment). Observed results, all assertions passing:

```
GET /health -> 200 {"ok":true,"service":"parse-email-demo"}
Plain body -> OTP 731204 extracted, encoding "plain"
Base64 body -> decoded to "Your OTP is 482916 - valid for 10 minutes.",
  OTP 482916 extracted
Unknown route -> 404
```

What it deliberately omits, per the skill's own warnings: no D1
binding (nothing to store), no secrets, and no admin surface. A real
service adds those behind the router, with migrations applied and
probed before the code that needs them ships.
