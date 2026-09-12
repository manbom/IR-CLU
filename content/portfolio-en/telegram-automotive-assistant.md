---
slug: telegram-automotive-assistant
status: live
featured: false
order: 3

title: Automotive Repair & Parts Telegram Assistant
tagline: Diagnosis, consulting, payment, and full business management — all from inside the same Telegram

client: An auto repair shop and parts dealer (confidential)
industry: Auto repair and parts sales
role: Architecture design, implementation, and deployment (freelance)
duration: Live and in continuous development
year: "2025"

headline_metrics:
  - value: "18"
    label: modular n8n workflows
    note: each owning one part, merged into a single file for simple installs
  - value: "4"
    label: high-transaction tables migrated
    note: from Google Sheets to Postgres, with zero service downtime
  - value: "27"
    label: blocked empty-message failure points
    note: a message that used to crash the bot is now blocked everywhere

problem: >
  The business owner dealt daily with repetitive customer messages about car problems,
  questions about consultation pricing, and payment receipts. Manually verifying receipts,
  finding a customer in the notebook, and answering similar technical questions took a lot of
  time and couldn't scale.

solution: >
  An end-to-end Telegram bot with two fully separate roles: for the customer — registration,
  a 15-minute AI diagnostic consultation, connection to a specialist mechanic, and
  card-to-card payment with admin approval; for the admin — a live dashboard, payment
  approval, customer search, live chat, and adding new technical knowledge with AI, all from
  inside the same Telegram.

outcome: >
  A fully operational bot that carries a customer from their very first message through
  payment approval and referral to a mechanic with no human involvement — and its admin
  panel lives inside the same app the client already opens every day, not a separate
  dashboard that takes time to learn.

features:
  - title: Registration and vehicle profile
    detail: Sign-up with phone number, location, and vehicle details — multiple vehicles per user.
  - title: 15-minute AI consultation
    detail: Diagnosis with a real timer, an end-of-time warning, and the option to extend or escalate to a real mechanic.
  - title: Automatic mechanic matching
    detail: Automatic selection of a specialist mechanic based on city and priority.
  - title: Card-to-card payment with admin approval
    detail: Receipt photo upload, one-tap admin approval, automatic notification to the customer.
  - title: Live admin dashboard
    detail: User count, today's/monthly revenue, pending payments, active consultations — all inside Telegram.
  - title: Live two-way chat with any customer
    detail: Directly from the admin's Telegram, with no need to know the customer's ID.
  - title: Adding technical knowledge with AI
    detail: The admin just types the car problem in plain language; AI turns it into a structured record (category, symptoms, causes, safe/dangerous actions) and stores it.

challenges:
  - title: A live migration with zero downtime
    body: >
      Moving 4 high-transaction tables from Google Sheets to Postgres, with dozens of nodes
      automatically rewritten via a script (not by hand), fully preserving prior behavior,
      and fixing a long-standing root-cause bug ("duplicate user") with a real unique
      constraint at the database level.

  - title: Fixing a race condition at the start of a consultation
    body: >
      Writing to the database and notifying the customer ran in parallel; if the customer
      messaged very quickly, the system hadn't yet marked the state "active." Solved by
      precisely chaining the execution order.

  - title: Preventing notification spam
    body: >
      Reminders for overdue payments kept repeating every 10 minutes without pause; a
      cooldown mechanism (at most once every 4 hours per case) turned it into a reasonable
      reminder.

  - title: Hardening against external service outages
    body: >
      A temporary Google connection drop (OAuth token expiry) used to completely break the
      /start command; now every critical message has a default fallback version, and sending
      an empty message to Telegram — which used to cause a crash — is blocked at 27 separate
      points.

decisions:
  - A hybrid database — high-transaction, concurrency-sensitive tables on Postgres, business settings and the knowledge base on Google Sheets so the non-technical client can edit them directly
  - A retrieval layer before GPT — answers are grounded in the business's own verified knowledge, not a guess
  - A system prompt with an explicit stop-driving instruction for dangerous conditions (brakes, burning smell, fuel leak) and immediate referral to a mechanic
  - Failure-protected caching — if a read fails once, the cache isn't filled with bad data; it retries on the next run instead

stack:
  - name: n8n
    role: Orchestration engine, 18 modular workflows
  - name: Telegram Bot API
    role: The entire UI — customer and admin
  - name: OpenAI (GPT-4.1)
    role: Diagnostic conversation with knowledge retrieval
  - name: Supabase (Postgres)
    role: High-transaction, concurrency-sensitive tables
  - name: Google Sheets
    role: Business settings, plans, knowledge base

tags: [Automation, Telegram Bot, n8n, AI, Payments, Auto Repair]

technical_facts:
  - label: AI consultation length
    value: "15 minutes"
    detail: with a real timer and end-of-time warning
  - label: Payment reminder cooldown
    value: every 4 hours
    detail: prevents notification spam
  - label: Settings & mechanics cache
    value: "5 minutes"
    detail: with protection against bad-data corruption

demo:
  available: false
  note: This is a private bot for a real client; this file's content has been sanitized for public display.

confidentiality: >
  The business's exact name, customer information, and internal infrastructure paths do not
  appear in this file.
---

## Short narrative

The owner of an auto repair shop and parts store dealt daily with repetitive customer
messages about car problems, consultation pricing questions, and payment receipts —
manually verifying each one took a lot of time and didn't scale.

The solution became an end-to-end bot with two fully separate roles: the customer goes from
AI diagnosis to connecting with a mechanic and paying, all inside the same Telegram, while
the admin manages the entire business — dashboard, payment approval, live chat with
customers, even adding new technical knowledge — from the same app they already open every
day.

The hardest part of the work was a live migration of four high-transaction tables from
Google Sheets to Postgres, without a single moment of downtime for active users — with
dozens of nodes automatically rewritten via a script, not by hand, and a root-cause
"duplicate user" bug fixed only by a real unique constraint at the database level, not by
application code.
