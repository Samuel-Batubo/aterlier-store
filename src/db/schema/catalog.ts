// Catalog tables: categories, products and per-product stock.
// Relative imports only: this file is also loaded by drizzle-kit and src/db/seed.ts outside Next.
import { relations, sql } from "drizzle-orm";
import {
  char,
  check,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export type ImageData = { src: string; alt: string };

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  ...timestamps,
});

export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull().unique(),
    sku: text("sku").notNull().unique(),
    name: text("name").notNull(),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),
    /** Minor units (cents). */
    priceCents: integer("price_cents").notNull(),
    currency: char("currency", { length: 3 }).notNull().default("USD"),
    description: text("description").notNull(),
    details: text("details").array().notNull().default(sql`'{}'::text[]`),
    care: text("care").notNull(),
    badge: text("badge"),
    imageSrc: text("image_src").notNull(),
    imageAlt: text("image_alt").notNull(),
    /** Additional gallery images, shown after the primary image. */
    gallery: jsonb("gallery").$type<ImageData[]>().notNull().default([]),
    ...timestamps,
  },
  (t) => [
    index("products_category_id_idx").on(t.categoryId),
    index("products_created_at_idx").on(t.createdAt),
    check("products_price_cents_nonnegative", sql`${t.priceCents} >= 0`),
  ],
);

/** One row per product while there are no variants. A missing row means 0 in stock. */
export const inventory = pgTable(
  "inventory",
  {
    productId: uuid("product_id")
      .primaryKey()
      .references(() => products.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull().default(0),
    updatedAt: timestamps.updatedAt,
  },
  (t) => [check("inventory_quantity_nonnegative", sql`${t.quantity} >= 0`)],
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, { fields: [products.categoryId], references: [categories.id] }),
  inventory: one(inventory),
}));

export const inventoryRelations = relations(inventory, ({ one }) => ({
  product: one(products, { fields: [inventory.productId], references: [products.id] }),
}));
