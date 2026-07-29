---
name: impeccable
description: "Final quality gate for this project — a checklist to run before declaring any change on this site or its n8n workflows 'done'. Actions: quality check, verify before shipping, pre-completion review, don't guess. Use whenever a change is about to be reported as finished."
metadata:
  author: irclu
  version: "1.0.0"
---

# Impeccable — Ship Nothing Unverified

This project (irclu.com + its n8n workflows) has already paid, more than once, for reporting a
fix as done when it was actually an untested guess: a hand-authored n8n parameter that turned
out wrong (`fileId` vs `file`), a CORS assumption that turned out false, a duplicate-data bug
that only surfaced after real usage. This skill exists so that stops happening again.

## When to activate
Before saying a task is complete — for a code change, a new n8n node/workflow, or a generated
page/asset. Not for pure research or read-only questions.

## The checklist

Run whatever subset actually applies, don't skip the ones that are inconvenient:

1. **Does it actually run?** For code: `npx tsc --noEmit` and `npx eslint <changed files>`. For
   generated n8n workflow JSON: `JSON.parse` it, then check every connection points at a node
   that exists, and syntax-check every Code node's `jsCode` with `new Function(...)`.
2. **Does the logic actually produce the right output, not just valid syntax?** Where feasible,
   execute the real function/code with realistic mock data (including the malformed/edge-case
   input, like a corrupted `chat_history` or a duplicate row) and check the actual output —
   don't stop at "it parses."
3. **Is the guess flagged as a guess?** Any n8n node parameter, Telegram Bot API field, or
   third-party API shape that wasn't verified against a real running instance is a guess, not a
   fact. Say so explicitly, and give the user a concrete way to check/fix it themselves if wrong
   — don't present uncertain things with false confidence.
4. **Did a live check replace a guess wherever possible?** `curl`/`openssl s_client` beat
   "n8n probably handles this automatically" every time — this project has been burned by that
   assumption twice (attribution footer, CORS headers).
5. **UI changes**: actually reasoned through both light and dark theme, RTL layout, and
   `prefers-reduced-motion` — not just the default state.
6. **Does this touch money or delivery?** (order status, license issuance, payment amounts) —
   double-check idempotency: what happens if this exact step runs twice for the same input?

## Reporting back
State plainly which of the above was actually verified vs. which is still a best-effort guess
pending the user's test — never blur the two together.
