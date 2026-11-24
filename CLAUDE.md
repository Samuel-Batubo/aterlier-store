# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project status

Early stage: Next.js 16 (App Router, `src/` dir, Turbopack) + TypeScript + Tailwind v4, with Better Auth, Drizzle ORM and Neon Postgres. The catalog (products, categories, stock) is in Postgres. Carts, orders, payments, reviews, wishlists, variants and auth flows don't exist yet. Don't add those unless asked.

## Environment

There is no committed env template. Create `.env.local` with:

| Variable | Notes |
|---|---|
| `DATABASE_URL` | Neon **pooled** connection string; the host looks like `ep-…-pooler.<region>.aws.neon.tech` |
| `BETTER_AUTH_SECRET` | Random secret (`npx @better-auth/cli secret`). Without it, `next build` logs a "default secret" `BetterAuthError` (non-fatal) |
| `BETTER_AUTH_URL` | App origin, e.g. `http://localhost:3000` |
| `NEXT_PUBLIC_APP_URL` | Same origin, for the browser auth client |

`.gitignore` ignores every `.env*` file (`!.env.example` would re-include a template if one is added). Never commit real values.

Load order: Next, `drizzle.config.ts` and `src/db/seed.ts` all read `.env.local` before `.env`, so `.env.local` wins. A variable already set in the OS or shell environment beats both files, because dotenv doesn't override existing variables. A leftover placeholder URL in `.env.local` (or a stale Windows env var) therefore silently shadows a real one in `.env`.

`src/db/index.ts` throws at import time if `DATABASE_URL` is unset, so `next build` and any request touching `/api/auth/*` fail without it. `next build` also needs a **migrated and seeded** database, because product pages query it in `generateStaticParams`, which must return at least one slug under Cache Components.

`drizzle-kit migrate` exits 1 **without printing the cause** when it can't reach the database (bad host, DNS, wrong URL). To see the real error, run the migration through `drizzle-orm/neon-http/migrator` from a small Node script, or `fetch` the host directly. A new Neon endpoint can also fail DNS (`ENOTFOUND`) briefly right after creation; retry before assuming the URL is wrong.

## Architecture

- **Next.js 16 config** (`next.config.ts`): `cacheComponents` and `partialPrefetching` are enabled, and Tailwind CSS is processed by the `@tailwindcss/turbopack` loader. Cache Components changes data-fetching/caching semantics vs. older Next.js, so consult `node_modules/next/dist/docs/` before writing data-fetching code.
- **Database**: `src/db/index.ts` exports a single `db` built with `drizzle-orm/neon-http` (Neon serverless HTTP driver, no interactive transactions) and the `schema` namespace from `src/db/schema.ts`. That file is the schema entry point for both the runtime client and drizzle-kit, so new table modules must be re-exported from it.
- **Catalog**: tables are in `src/db/schema/catalog.ts`: `categories` 1─< `products` 1─1 `inventory` (stock quantity, kept separate from product rows; a missing row means 0). Prices are integer minor units. Pages read the catalog only through `src/lib/catalog.ts` (server-only, `"use cache"` + `cacheTag("products")` + `cacheLife("minutes")`), which maps rows to the client-safe `Product`/`Image` types in `src/lib/catalog-types.ts`. Anything that writes catalog or stock data should call `revalidateTag("products")`.
- **Migrations**: edit the schema, run `npm run db:generate` (versioned SQL in `drizzle/`, commit it), then `npm run db:migrate`. Don't use `db:push`. `npm run db:seed` (`src/db/seed.ts`, run via tsx) upserts `src/db/seed-data.ts` and is safe to re-run. It builds its own DB client because `src/db/index.ts` is server-only, so files it imports must use relative imports, not `@/`.
- **Auth**: `src/lib/auth.ts` is the Better Auth server instance using `drizzleAdapter(db, { provider: "pg" })`. `nextCookies()` must stay the **last** plugin. It is served via the catch-all `src/app/api/auth/[...all]/route.ts` (`toNextJsHandler`). `src/lib/auth-client.ts` is the client-side `createAuthClient` from `better-auth/react`. No auth methods are enabled and the Better Auth tables don't exist yet. Generate them with `npx @better-auth/cli generate --output src/db/auth-schema.ts`, re-export from `schema.ts`, then run `db:generate` and `db:migrate`.
- **Server/client boundary**: `src/db/index.ts` and `src/lib/auth.ts` import `server-only`. Never import them from client components; use `authClient` instead.

## Images

`next.config.ts` uses a custom global loader (`src/lib/image-loader.ts`): Unsplash URLs are resized by Unsplash's CDN, and every other `src` is returned unchanged. This disables the built-in `/_next/image` optimizer (it was timing out proxying Unsplash), so add a loader branch when real product media gets a CDN. Homepage editorial content (nav, hero, collection tiles, footer) is still placeholder data in `src/lib/sample-data.ts`, while products come from the DB. Most linked routes don't exist yet.

## Product pages

`src/app/products/[slug]/page.tsx` prerenders every product via `generateStaticParams`. `dynamicParams` is unavailable under Cache Components, so the first request for a brand-new unknown slug streams the 404 UI with HTTP 200 plus `noindex`, and later requests return a real 404. Stock labels and thresholds come from `src/lib/stock.ts`; listing cards and the product page both use it, so keep them in sync through that file.

## Windows/OneDrive gotcha

The repo lives in a OneDrive folder. OneDrive can turn `.next/` entries into cloud placeholders, which makes `next build` fail with `EPERM ... unlink`. Delete `.next` and rebuild. After deleting it, run `next build` before `tsc --noEmit`, because the global `LayoutProps`/`PageProps` types are generated into `.next/types`.

## Repository

The remote is `origin` → `https://github.com/Samuel-Batubo/aterlier-store.git`. The GitHub repo name is spelled `aterlier-store`, unlike the project name. That's the URL the owner gave, so don't "fix" it without asking. The default branch is `main`, and commits use the GitHub noreply address set in the repo-local git config. Pushing over HTTPS needs an interactive GitHub sign-in the first time, which a non-interactive shell can't show, so the first push has to come from a regular terminal.

## Design system

All tokens and composite utilities live in `src/app/globals.css` (Tailwind v4 CSS-first config; there is no `tailwind.config.*`). Fonts are loaded in `src/app/layout.tsx` (Inter → `font-sans`, Bodoni Moda → `font-serif`).

- The default Tailwind color palette, radius scale and shadow scale are **reset** (`--color-*: initial`, etc.). Only the semantic tokens exist: `ink`, `paper`, `surface`, `surface-strong`, `muted`, `subtle`, `line`, `line-strong`, `danger`, `success`, `overlay`. Classes like `bg-white`, `text-zinc-500` or `rounded-md` will silently produce nothing.
- Prefer the composite utilities (`container-content`, `grid-products`, `text-eyebrow`, `text-display`, `btn btn-primary`, `link`, `link-reveal`, `hairline-b`, `media-well`) and fluid spacing tokens (`px-gutter`, `py-section`, `gap-grid-gap`) over ad-hoc values.
- React primitives in `src/components/ui/` (`Container`, `Section`, `Button`/`buttonClasses`, `TextLink`) are thin wrappers over those utilities.

## Known issue

`npm audit` reports moderate esbuild advisories via `drizzle-kit`'s `@esbuild-kit/*` deps. That is dev-only tooling. `npm audit fix --force` would downgrade drizzle-kit to 0.18 and break it, so don't run it.
