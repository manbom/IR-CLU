---
slug: senaryo-desktop-app
status: live
featured: true
order: 2

title: "Senaryo: an AI pipeline for viral-content scenario generation"
tagline: Real analysis of viral videos, not guesswork — from idea to a shoot-ready scenario

client: Personal product (B2C SaaS, real customers)
industry: Content production / AI
role: Sole full-stack developer — from core architecture to UI, service integrations, licensing, and support
duration: Ongoing development and maintenance
year: "2025"

headline_metrics:
  - value: "4"
    label: AI pipeline stages
    note: Discovery, Transcript, Analysis, Generation
  - value: "9"
    label: real external service integrations
    note: OpenAI, YouTube, Instagram, Apify, Pexels, Pixabay, Kling, PoYo, ElevenLabs
  - value: "8"
    label: independent feature-development rounds
    note: without touching the core pipeline

problem: >
  Short-form Persian content creators typically either guess what will go viral, or spend
  hours manually reviewing dozens of successful videos trying to find the common pattern.

solution: >
  A Windows desktop app that analyzes real viral YouTube/Instagram videos in a given niche,
  works out exactly why each one went viral, and generates several completely fresh,
  shoot-ready scenarios in Persian on that basis — hook, full script, shot list, caption,
  hashtags, and even a finished, post-ready video.

outcome: >
  An active product, packaged as a single standalone exe, sold on a monthly subscription to
  real customers — a process that used to take hours of manual review now takes a few
  minutes and is based on real analysis, not a guess.

features:
  - title: Discovery
    detail: Searches for related videos, ranks them with a proprietary "virality score" metric — a video's views relative to that same channel/account's average, not raw view count alone.
  - title: Transcript
    detail: A chain of fallback sources (public captions → Whisper on audio → video description) so no video is ever left without analyzable data.
  - title: Analysis
    detail: A GPT call in forced per-video JSON mode, extracting the hook, narrative structure, pacing, emotional triggers, and key moments.
  - title: Generation
    detail: Combines the patterns extracted from every reference video into several completely fresh ideas, each linked directly back to the source that inspired it.
  - title: Full commercial packaging
    detail: A standalone exe with a native splash screen, no Python install needed on the customer's machine; a tamper-resistant licensing layer.

challenges:
  - title: A bug that actually cost a real customer
    body: >
      A helper function was silently dropping 4 of 7 analysis fields before they reached the
      idea-generation prompt — the result was thin, low-quality scenarios and a real customer
      complaint that led to churn. Root-caused and fully fixed, alongside a full prompt
      rewrite built around a professional copywriting framework, and verified live against
      the real OpenAI API.

  - title: Persian text that wouldn't render correctly
    body: >
      Pillow, without complex-text shaping support (raqm), displayed Persian letters
      disconnected and out of order. Fix: text rendering was moved to Qt's own text engine —
      a pattern deliberately repeated twice, in two independent parts of the product
      (thumbnails and video subtitles).

  - title: A silent multi-hour hang during video export
    body: >
      Video export would sometimes spin for hours with no error at all. Root cause: a
      subprocess call with no timeout that never raised an exception if FFmpeg got stuck.
      Fixed with an explicit timeout and a clear Persian error message — and a second,
      independent instance of the same bug class was found and fixed in a different pipeline
      before release, during real end-to-end testing.

  - title: A licensing service that moved infrastructure twice
    body: >
      The subscription-verification service changed address twice due to company
      infrastructure migrations; each time it was root-caused and fixed by direct diagnosis
      (curl -v) of the exact error signature, not a guess.
    evidence: |
      Before diagnosis: 200 response with an empty body (misleading silence)
      After diagnosis: explicit 404 from n8n — the migrated address was identified

  - title: A real customer genuinely locked out
    body: >
      An intermediate path from the license-validation gate, unlike the app's startup path,
      would never retry going online again once the cache was stale — a customer who
      regularly restarted the app (completely normal behavior) could go on forever without a
      real live check ever happening. Fixed by adding a targeted retry precisely on that
      state.

decisions:
  - Rejected a more powerful video-generation framework (OpenMontage) over its AGPLv3 license — integrating it could have pulled the whole closed-source product into copyleft obligations
  - Video processing runs through an isolated subprocess for FFmpeg (not linked directly into the binary) — a deliberate choice to avoid the same class of legal risk
  - A lightweight, hand-built database migration system (no Alembic) so adding a new column never breaks an existing customer's database
  - A 4-stage pipeline architecture fully independent of the GUI — every stage is runnable and testable even outside the UI
  - "Error telemetry infrastructure: automatic, silent reporting of background errors to a dedicated developer Telegram bot, with a customer ID and a send-rate limit"

stack:
  - name: Python
    role: Main application language
  - name: PySide6 + QFluentWidgets
    role: Desktop UI with full Persian RTL support
  - name: SQLAlchemy + SQLite
    role: Local database, with a hand-built lightweight migration system
  - name: FFmpeg (isolated subprocess)
    role: Video and audio processing
  - name: APScheduler
    role: Background scheduling + Windows System Tray
  - name: OpenAI (GPT + Whisper + gpt-image)
    role: Analysis, text generation, audio transcription, image generation
  - name: n8n
    role: Self-hosted webhook for license verification
  - name: PyInstaller
    role: Packaging into a single standalone exe

tags: [AI, Desktop App, Python, Content Production, SaaS]

technical_facts:
  - label: Packaging
    value: single standalone exe
    detail: no Python install needed on the customer's machine
  - label: License infrastructure
    value: HMAC-signed cache
    detail: system-clock tampering detection, fail-closed offline window
  - label: Video processing
    value: isolated subprocess
    detail: no direct FFmpeg linking, to avoid AGPL legal risk

demo:
  available: false
  note: A commercial product with real customers; no public demo version is available.

confidentiality: >
  Every figure and technical claim in this file is real and traceable to the project's code.
  No real customer names, payment information, or internal infrastructure paths appear in
  this file.
---

## Short narrative

Short-form Persian content creators either guess what will go viral, or spend hours manually
reviewing dozens of successful videos. Senaryo automates that process in a few minutes: a
real search, real AI analysis, and delivery of a fully ready scenario — not a vague idea the
user still has to turn into a script themselves.

The hardest part of the work was a production bug that actually cost a customer: a helper
function was silently dropping part of the analysis data before it reached the generation
prompt. The result was thin scenarios and a real complaint. Root-causing bugs like this in a
multi-stage pipeline — where an error in one stage only shows up in its final output — is
exactly what separates an experienced engineer from someone who's only been trained.

What's left from this project isn't just an app — it's a complete commercial product: from
the AI core to the licensing infrastructure, packaging, and direct support based on real
customer reports.
