# CLAUDE.md — creova

Instructions for AI coding agents working in this repository.

## Project Overview

CREOVA's marketing/portfolio site and shared strategy documents — including `EAST-AFRICA-FINTECH-THESIS.md`, the reference document connecting gopay, sauti-os, and kultr-hub's roles in a shared fintech/creator-economy architecture.

## Repository Structure

- `EAST-AFRICA-FINTECH-THESIS.md` — treat as strategic reference, not proof that cross-product integration is implemented. Verify actual API/data-flow claims against the referenced repos directly before assuming they're built.
- Supabase backend here holds only scaffold tables (`knowledge_base`, `kv_store`) with RLS enabled and zero policies (correct default-deny state) — there is no real business data at risk in this repo's own database.

## Technology Stack

React/Vite, Supabase (minimal/scaffold usage), has its own CI + deploy workflow.

## AI Agent Rules

- If asked to expand the fintech thesis's cross-product integration, check the actual code in gopay/sauti-os/kultr-hub first — do not treat the thesis document itself as the source of truth for what's built.
- Keep CREOVA-wide strategy docs here; don't duplicate them into individual product repos beyond a short cross-reference link.

## Definition of Done

Any claim about cross-repo integration in this repo's docs is checked against the actual target repo's code, not just written to match the thesis narrative.
