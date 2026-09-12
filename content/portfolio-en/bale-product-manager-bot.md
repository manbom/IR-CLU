---
slug: bale-product-manager-bot
status: live
featured: false
order: 1

title: Bale Channel Product Manager Bot
tagline: Change a price from inside a chat; the same channel post edits itself — no separate web panel

client: A store with a product-sales channel on Bale (confidential)
industry: Online retail
role: Freelance developer — sole technical owner of the project
duration: Initial delivery + ongoing iterative development based on client feedback
year: "2025"

headline_metrics:
  - value: "11"
    label: modular n8n workflows
    note: plus one merged single-file version for easy maintenance
  - value: "3"
    label: typo-tolerant search layers
    note: exact → normalized → text similarity (trigram)
  - value: "15"
    label: minute auto-check interval for sales
    note: scheduled end with no manual step

problem: >
  Every time the store owner needed to change a price or start a temporary discount, they
  had to manually find and edit the old product post in the Bale channel: slow, error-prone,
  no history of changes, and no access control among the several people who might set prices.

solution: >
  A bot built entirely on n8n and PostgreSQL that talks directly to the Bale Bot API — no
  dedicated backend, no separate web panel. The admin searches for and edits a product from
  the same private chat with the bot; the bot edits that same old channel post, never
  creating a duplicate.

outcome: >
  The client no longer searches and edits channel posts by hand; pricing, sales, and
  descriptions happen from inside the same private chat with the bot — with a full change
  history, access control across several admins, and never a duplicate post in the channel.

features:
  - title: Automatic product capture from channel posts
    detail: Every new post in the expected format is recorded with no manual work; editing or re-forwarding the same post updates the stored record too.
  - title: Typo-tolerant search
    detail: Exact match → normalized match → partial name match; if nothing matches, it suggests the closest names by text similarity. Indifferent to Persian/Arabic/English digit scripts and Arabic-Persian letter variants.
  - title: Conditional second price
    detail: A fallback price with any condition you like (e.g. cash vs. installment), each with its own explanation text.
  - title: Sales with an automatic timer
    detail: A discount on one or several products at once, ending on a schedule or manually, with bulk operations and a success/failure report for each item.
  - title: Confirm before it goes live
    detail: Any change shows a confirm/cancel screen before it's applied to the channel.
  - title: Access control and a full history
    detail: Only pre-defined admin IDs may use it; every sensitive action is logged with a timestamp and who did it.

challenges:
  - title: Discovering the API's real behavior, not just its docs
    body: >
      Before building anything, instead of trusting the Bale Bot API documentation, its real
      behavior was verified with hands-on testing — exactly what a channel post looks like
      once it reaches the webhook, and what data forwarding an old post actually carries.
      That informed a reliable fallback path (manual forwarding to register old posts).

  - title: Search that tolerates typos
    body: >
      Admins don't always type the product name exactly. Instead of simple exact-match
      search, a three-layer chain was built: exact match, normalized match, and — when
      nothing matches — a suggestion of the closest names by text similarity (PostgreSQL
      trigram similarity), independent of digit script and Arabic-Persian letter differences.

  - title: Guaranteeing a duplicate post is never created
    body: >
      A price change must always edit the same old post, never create a new one. The logic
      is built so that if the edit fails (say, an API access limit), no replacement post is
      ever created — the error is reported clearly to the admin so they decide, not the
      system.

decisions:
  - All business logic (conversation state machine, validation, error handling) lives in n8n workflows and PostgreSQL — no dedicated backend server
  - Each admin's conversation state is kept in the database, not in memory — a half-finished conversation survives a server restart
  - "Idempotency at several layers: duplicate webhook message processing and duplicate product registration are both blocked"
  - Product-name normalization at the database level (a function + trigger in PostgreSQL), independent of digit script and Arabic-Persian letter differences

stack:
  - name: n8n
    role: Orchestration engine and business logic
  - name: PostgreSQL (Supabase)
    role: Database, trigram search, text normalization
  - name: Bale Bot API
    role: The entire UI (admin chat)
  - name: Docker
    role: Deployment
  - name: JavaScript
    role: Custom logic inside workflows

tags: [Automation, Messaging Bot, n8n, PostgreSQL, No-code/Low-code Backend, Online Retail, Bale]

demo:
  available: false
  note: This is a private bot for a real client; this file's content has been sanitized for public display.

confidentiality: >
  Sensitive information (tokens, internal IDs, panel address, the store's exact name) has
  deliberately been removed from this file.
---

## Short narrative

A store that introduced its products with photo posts in a Bale channel had to manually
find and edit the old post every time it needed a price change or a temporary discount —
slow, error-prone, and with no record of who changed what and when.

The hardest part of the work was refusing to assume the Bale Bot API's behavior. The
official docs didn't say everything — exactly what data forwarding an old post carries only
became clear through hands-on testing against a real bot. The final architecture, from
typo-tolerant search to the guarantee that a duplicate post is never created, was built on
that verified behavior, not a guess.

The result is a bot that keeps the entire price-management cycle inside the same chat the
client already opens every day — no separate web panel, no extra training, and nobody
having to learn a new dashboard.
