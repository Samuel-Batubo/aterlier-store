# Atelier Store

Next.js (App Router) + TypeScript + Tailwind CSS v4, with Better Auth, Drizzle ORM and Neon Postgres.

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in DATABASE_URL and BETTER_AUTH_SECRET
npm run dev
```

## Structure

```
src/
  app/
    api/auth/[...all]/route.ts   Better Auth route handler
  db/
    index.ts                     Drizzle client (Neon HTTP driver)
    schema.ts                    Drizzle schema entry point (empty)
  lib/
    auth.ts                      Better Auth server instance
    auth-client.ts               Better Auth React client
drizzle.config.ts                drizzle-kit config (migrations go to ./drizzle)
```

## Scripts

| Script                | Purpose                              |
| --------------------- | ------------------------------------ |
| `npm run dev`         | Start the dev server                 |
| `npm run build`       | Production build                     |
| `npm run lint`        | ESLint                               |
| `npm run typecheck`   | TypeScript check                     |
| `npm run db:generate` | Generate SQL migrations from schema  |
| `npm run db:migrate`  | Apply migrations                     |
| `npm run db:push`     | Push schema directly (dev only)      |
| `npm run db:studio`   | Open Drizzle Studio                  |

## Next steps (not yet done)

- Generate the Better Auth tables: `npx @better-auth/cli generate --output src/db/auth-schema.ts`, re-export them from `src/db/schema.ts`, then run `npm run db:generate && npm run db:migrate`.
- Enable auth methods (e.g. `emailAndPassword` or social providers) in `src/lib/auth.ts`.
