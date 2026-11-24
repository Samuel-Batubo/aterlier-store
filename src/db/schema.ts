// Schema entry point for both the runtime client (src/db/index.ts) and drizzle-kit.
// Every table module must be re-exported from here.
//
// Better Auth tables can be generated with:
//   npx @better-auth/cli generate --output src/db/auth-schema.ts
// then re-exported from this file and migrated with `npm run db:generate` / `npm run db:migrate`.

export * from "./schema/catalog";
