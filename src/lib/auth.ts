import "server-only";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";

// Minimal Better Auth server instance. Providers, plugins and the auth
// schema are not configured yet.
export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  // nextCookies must be the last plugin in the list.
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
