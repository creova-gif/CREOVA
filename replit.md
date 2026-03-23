# CREOVA - Black-Owned Creative Agency Website

## Project Overview
CREOVA is a high-end, professional website for a Black-owned creative agency based in Ontario, Canada. The agency specializes in photography, videography, brand management, and digital content creation, serving BIPOC communities.

## Tech Stack
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v4 + Radix UI + Shadcn UI patterns
- **Routing**: React Router v6
- **Animations**: Framer Motion + Embla Carousel
- **Backend/DB**: Supabase (auth, database, edge functions)
- **Payments**: Stripe
- **Error Tracking**: Sentry
- **i18n**: Custom English/French context-based translations

## Project Structure
```
src/
  components/     # Reusable UI components
    ui/           # Base design system (Shadcn/Radix)
    figma/        # Figma-generated helpers (ImageWithFallback)
  pages/          # Route-level components
  context/        # React Context providers (Cart, Language)
  utils/          # Helpers (security, payments, logger)
  supabase/       # Supabase client config + edge functions
  assets/         # Image assets (placeholder PNGs for Figma exports)
  styles/         # Global CSS
```

## Key Features
- Service booking (photography, videography, brand design packages)
- E-commerce shop with cart, checkout, and HST tax
- Bilingual support (EN/FR)
- Admin dashboard at `/admin`
- SEO via react-helmet-async

## Development
- Run: `npm run dev` on port 5000
- Build: `npm run build` (outputs to `build/`)

## Environment Configuration
- Vite dev server: `0.0.0.0:5000` with `allowedHosts: true` for Replit proxy compatibility
- Assets: Figma-exported image assets go in `src/assets/` (currently placeholder PNGs)
- Deployment: Static site deployment using `npm run build`, serving from `build/` directory

## Notes
- The `src/assets/` directory contains placeholder PNG files for Figma asset references. Replace these with actual images.
- Supabase and Stripe require environment variables to be set for full functionality.
- Some duplicate translation keys exist in `LanguageContext.tsx` (non-breaking warnings).
