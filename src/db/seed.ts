// Seeds categories, products and stock. Safe to re-run: rows are upserted by slug / product_id,
// and rows not in the seed data are left alone.
//
//   npm run db:seed
//
// Builds its own client instead of importing ./index (that file imports "server-only",
// which throws outside Next).
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { getTableColumns, sql, type SQL } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import type { PgTable } from "drizzle-orm/pg-core";
import * as schema from "./schema/catalog";
import { seedCategories, seedProducts } from "./seed-data";

config({ path: ".env.local", quiet: true });
config({ quiet: true });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is not set. Copy .env.example to .env.local.");

const db = drizzle({ client: neon(databaseUrl), schema });
const { categories, products, inventory } = schema;

/** `SET col = excluded.col` for the given columns, for onConflictDoUpdate. */
function excluded<T extends PgTable>(table: T, keys: (keyof T["_"]["columns"] & string)[]) {
  const columns = getTableColumns(table);
  return Object.fromEntries(
    keys.map((key) => [key, sql.raw(`excluded."${columns[key].name}"`)]),
  ) as Record<string, SQL>;
}

const categoryId = (slug: string) => sql`(select id from ${categories} where ${categories.slug} = ${slug})`;
const productId = (slug: string) => sql`(select id from ${products} where ${products.slug} = ${slug})`;

async function main() {
  // Newest first in the seed list → descending created_at, one minute apart.
  const base = Date.now();

  await db.batch([
    db
      .insert(categories)
      .values([...seedCategories])
      .onConflictDoUpdate({
        target: categories.slug,
        set: { ...excluded(categories, ["name"]), updatedAt: sql`now()` },
      }),

    db
      .insert(products)
      .values(
        seedProducts.map((p, i) => ({
          slug: p.slug,
          sku: p.sku,
          name: p.name,
          categoryId: categoryId(p.category),
          priceCents: p.priceCents,
          currency: "USD",
          description: p.description,
          details: p.details,
          care: p.care,
          badge: p.badge ?? null,
          imageSrc: p.image.src,
          imageAlt: p.image.alt,
          gallery: p.gallery ?? [],
          createdAt: new Date(base - i * 60_000),
        })),
      )
      .onConflictDoUpdate({
        target: products.slug,
        set: {
          ...excluded(products, [
            "sku",
            "name",
            "categoryId",
            "priceCents",
            "currency",
            "description",
            "details",
            "care",
            "badge",
            "imageSrc",
            "imageAlt",
            "gallery",
            "createdAt",
          ]),
          updatedAt: sql`now()`,
        },
      }),

    db
      .insert(inventory)
      .values(seedProducts.map((p) => ({ productId: productId(p.slug), quantity: p.stock })))
      .onConflictDoUpdate({
        target: inventory.productId,
        set: { ...excluded(inventory, ["quantity"]), updatedAt: sql`now()` },
      }),
  ]);

  const [counts] = await db.execute<{ categories: number; products: number; inventory: number }>(sql`
    select
      (select count(*)::int from ${categories}) as categories,
      (select count(*)::int from ${products}) as products,
      (select count(*)::int from ${inventory}) as inventory
  `).then((r) => r.rows);

  console.log(
    `Seeded. Totals: ${counts.categories} categories, ${counts.products} products, ${counts.inventory} inventory rows.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
