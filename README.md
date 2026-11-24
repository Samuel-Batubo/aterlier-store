# Atelier Store

A luxury fashion storefront built with Next.js 16 (App Router, Cache Components) + TypeScript + Tailwind CSS v4, with Better Auth, Drizzle ORM and Neon Postgres.

Products, categories and stock come from Postgres. Carts, orders, payments and sign-in aren't built yet.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` in the project root (it's git-ignored; never commit real values):

   ```bash
   # Neon pooled connection string (Neon console → Connect → "Pooled connection")
   DATABASE_URL=postgresql://<user>:<password>@ep-<name>-pooler.<region>.aws.neon.tech/<db>?sslmode=require

   # Generate with: npx @better-auth/cli secret
   BETTER_AUTH_SECRET=<random-secret>
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

   `.env.local` takes precedence over `.env`, and a variable already set in your OS environment takes precedence over both.

3. Create the tables and load the starter catalog:

   ```bash
   npm run db:migrate   # apply the SQL migrations in ./drizzle
   npm run db:seed      # 5 categories, 8 products with stock (safe to re-run)
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

`npm run build` needs the same setup: the database must be migrated **and** seeded, because product pages are prerendered from it.

## Structure

```
src/
  app/
    page.tsx                     Homepage
    products/[slug]/page.tsx     Product detail page
    api/auth/[...all]/route.ts   Better Auth route handler
  components/                    UI, layout, homepage and product components
  db/
    index.ts                     Drizzle client (Neon HTTP driver, server-only)
    schema.ts                    Schema entry point (re-exports every table module)
    schema/catalog.ts            categories, products, inventory tables
    seed.ts / seed-data.ts       Starter catalog seed
  lib/
    catalog.ts                   Cached catalog queries used by pages (server-only)
    catalog-types.ts             Product / Image view types
    stock.ts                     Stock labels and low-stock threshold
    sample-data.ts               Placeholder editorial content (nav, hero, footer)
    auth.ts / auth-client.ts     Better Auth server instance / React client
drizzle/                         Versioned SQL migrations (commit these)
drizzle.config.ts                drizzle-kit config
```

## Database

```
categories 1 ──< products 1 ── 1 inventory
```

- **categories**: `slug` (unique), `name`
- **products**: `slug` and `sku` (unique), `category_id`, `price_cents` (integer minor units), `currency`, description, details, care, badge, images
- **inventory**: one stock `quantity` per product; a product with no row counts as sold out

To change the schema, edit `src/db/schema/`, run `npm run db:generate`, review and commit the new SQL in `drizzle/`, then run `npm run db:migrate`.

Storefront pages cache catalog reads for a few minutes, so stock edits made directly in the database (for example in Drizzle Studio) show up after a short delay.

## Scripts

| Script                | Purpose                                     |
| --------------------- | ------------------------------------------- |
| `npm run dev`         | Start the dev server                        |
| `npm run build`       | Production build                            |
| `npm run lint`        | ESLint                                      |
| `npm run typecheck`   | TypeScript check                            |
| `npm run db:generate` | Generate SQL migrations from the schema     |
| `npm run db:migrate`  | Apply migrations                            |
| `npm run db:seed`     | Seed categories, products and stock         |
| `npm run db:studio`   | Open Drizzle Studio                         |
| `npm run db:push`     | Push schema directly (throwaway dev DBs only; use migrations otherwise) |

## Troubleshooting

- **`db:migrate` exits with code 1 and no message.** drizzle-kit hides connection errors. Check that `DATABASE_URL` is your real Neon URL, not a placeholder. A brand-new Neon endpoint can also fail DNS for a minute after creation.
- **`next build` fails with `EPERM ... unlink` (Windows/OneDrive).** Delete the `.next` folder and rebuild.
- **Build logs "You are using the default secret".** Set `BETTER_AUTH_SECRET` in `.env.local`.

## Next steps (not yet done)

- Generate the Better Auth tables: `npx @better-auth/cli generate --output src/db/auth-schema.ts`, re-export them from `src/db/schema.ts`, then run `npm run db:generate && npm run db:migrate`.
- Enable auth methods (e.g. `emailAndPassword` or social providers) in `src/lib/auth.ts`.
