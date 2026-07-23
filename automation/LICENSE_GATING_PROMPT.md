# Prompt: Add license-gated subscription checks to this application

Copy everything below the line into a Claude Code session that has this application's
source code open, and let it implement the changes.

---

I need you to turn this application into a licensed, subscription-gated product. It's sold
through IR-CLU's store (irclu.com/store) on a monthly subscription; a license key is issued
per purchase and must be re-verified against our server so access automatically expires
when the subscription lapses.

## License server (already built, don't build this part)

There's a working webhook you call to verify a license:

```
POST https://<N8N_INSTANCE>/webhook/license-verify
Content-Type: application/json

{ "license_key": "IRCLU-XXXX-XXXXXX", "machine_id": "<stable per-device fingerprint>" }
```

Responses:

```json
{ "valid": true, "expires_at": "2026-08-21T00:00:00.000Z" }
```
```json
{ "valid": false, "reason": "expired" | "not_found" | "deactivated" | "machine_mismatch" }
```

The first time a license key is checked with a given `machine_id`, the server locks that
key to that device — every later check with a different `machine_id` returns
`machine_mismatch`. This is the anti-sharing mechanism, so `machine_id` must be a **stable
hardware fingerprint**, not something regenerated per run (e.g. derive it from a hash of
motherboard/disk serial + MAC address on Windows, or the equivalent stable machine ID API
for whatever platform this app targets — never just a random UUID saved to a plain file,
since that can be deleted/copied to bypass the lock).

## What to implement

**1. First-run activation.** On first launch, prompt for the license key (the customer
receives it in Telegram after payment is approved). Store it locally in an encrypted or
OS-managed secure store (Windows Credential Manager / macOS Keychain / equivalent) — not a
plaintext config file anyone can edit.

**2. Verification schedule.**
- Check on every app startup, blocking further use until it resolves.
- While the app stays running, re-check at least once every 24 hours in the background.
- Cache the last successful check (timestamp + expires_at), signed or HMAC'd with a secret
  compiled into the binary, so the cache file can't be hand-edited to fake a valid state.

**3. Offline grace period.** If the server is unreachable (no internet), allow continued use
for up to **3 days** past the last successful check, using the cached signed timestamp. To
resist clock-rollback (user sets system clock back to extend grace indefinitely), also store
a monotonic counter or OS uptime reading alongside the wall-clock timestamp, and treat a
large negative jump in wall-clock time relative to the monotonic reference as a tamper signal
that ends the grace period immediately.

**4. Fail closed.** Any unexpected response, parse error, or ambiguous state must be treated
as **invalid**, never as valid. Never let a network exception silently mean "assume okay"
beyond the defined offline grace window.

**5. Enforcement, not just a warning.** When the license is invalid or expired:
- Disable the app's actual core functionality (not just a dismissible banner) — the
  processing/export/generation logic itself should refuse to run.
- Show a clear message: "اشتراک شما منقضی شده — برای تمدید به ربات تلگرام مراجعه کنید"
  with the bot's `t.me/<STORE_BOT_USERNAME>` link.
- Re-gate at more than one layer if the app has multiple entry points to its core feature
  (menu action, keyboard shortcut, CLI flag, scheduled/background job) — don't rely on a
  single checkpoint that's easy to route around.

**6. Harden against casual tampering.** This doesn't need to be uncrackable, but it should
take real effort to bypass, not a five-minute patch:
- Don't name the check function/module something obvious like `checkLicense()` in a way
  that makes it trivial to locate and neuter — light obfuscation of naming is enough.
- Don't gate on a single boolean flag stored in an easily-flipped location; tie the
  enforcement into the actual code path (e.g., the core function requires a value derived
  from the verified license state, not just an `if (isValid)` short-circuit around it).
- Always call the webhook over HTTPS; never fall back to HTTP.

**7. Renewal flow.** When a check returns `expired`, keep the app installed and let it
re-activate automatically as soon as the customer renews and the *same* license key starts
returning `valid: true` again — no reinstall or new key needed for a renewal.

Implement this without breaking any existing functionality when the license is valid, and
test explicitly: fresh activation, valid daily re-check, expired license, wrong/unknown key,
and the offline-grace-then-lockout path.
