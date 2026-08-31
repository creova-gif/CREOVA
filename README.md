# CREOVA

**Ontario's BIPOC creative agency — photography, videography, brand design, and event production, based in Niagara Region and serving clients across Canada.**

[![Status](https://img.shields.io/badge/status-live-brightgreen)]()
[![License](https://img.shields.io/badge/license-proprietary-red)]()

## Overview

The production marketing website for CREOVA's creative agency work, and the home of CREOVA's cross-portfolio strategy documentation.

## Key Capabilities

- Marketing site: photography, videography, brand management, event design, social media services
- Hosts `EAST-AFRICA-FINTECH-THESIS.md` — the reference document describing how Gopay, Sauti-Os, and Kultr-Hub connect as a single fintech/creator-economy architecture

## Architecture

React/Vite frontend with a minimal Supabase backend (scaffold tables only — `knowledge_base`, `kv_store` — with RLS enabled and no client policies, correctly default-deny). There is no real business data at risk in this repo's own database; its role is primarily the marketing site and shared strategy documentation.

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite |
| Backend | Supabase (minimal/scaffold usage) |
| CI/CD | Own `ci.yml` + `deploy.yml` |

## Project Status

Live — this is the active production marketing site.

## Contributing

Private, proprietary CREOVA product.

## License

Proprietary — All Rights Reserved.

## Author / Organization

Built by [Justin Mafie](https://github.com/creova-gif).

## Documentation

`EAST-AFRICA-FINTECH-THESIS.md` in this repo is a strategic reference, not proof that cross-product integration is built — verify claims against the actual target repos (Gopay, Sauti-Os, Kultr-Hub) directly. See `CLAUDE.md` for AI-agent-specific notes.
