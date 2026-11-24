import "server-only";
import { desc, eq, ne, sql } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import { categories, inventory, products } from "@/db/schema";
import type { Product } from "./catalog-types";

// Catalog reads are cached (Cache Components) so product pages still prerender.
// Every entry is tagged "products"; call revalidateTag("products") after catalog or stock writes.
// Until something writes through the app, cacheLife("minutes") bounds how stale stock can be.

const productColumns = {
  id: products.id,
  slug: products.slug,
  sku: products.sku,
  name: products.name,
  categoryId: products.categoryId,
  categoryName: categories.name,
  categorySlug: categories.slug,
  priceCents: products.priceCents,
  currency: products.currency,
  description: products.description,
  details: products.details,
  care: products.care,
  badge: products.badge,
  imageSrc: products.imageSrc,
  imageAlt: products.imageAlt,
  gallery: products.gallery,
  stock: sql<number>`coalesce(${inventory.quantity}, 0)`.mapWith(Number),
};

function selectProducts() {
  return db
    .select(productColumns)
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(inventory, eq(inventory.productId, products.id));
}

type ProductRow = Awaited<ReturnType<typeof selectProducts>>[number];

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    sku: row.sku,
    name: row.name,
    categoryId: row.categoryId,
    category: row.categoryName,
    categoryHref: `/collections/${row.categorySlug}`,
    price: row.priceCents,
    currency: row.currency,
    href: `/products/${row.slug}`,
    image: { src: row.imageSrc, alt: row.imageAlt },
    gallery: row.gallery,
    badge: row.badge,
    stock: row.stock,
    description: row.description,
    details: row.details,
    care: row.care,
  };
}

export async function getProductSlugs(): Promise<string[]> {
  "use cache";
  cacheTag("products");
  cacheLife("minutes");

  const rows = await db.select({ slug: products.slug }).from(products);
  return rows.map((r) => r.slug);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  "use cache";
  cacheTag("products", `product:${slug}`);
  cacheLife("minutes");

  const [row] = await selectProducts().where(eq(products.slug, slug)).limit(1);
  return row ? toProduct(row) : undefined;
}

export async function getNewArrivals(limit = 8): Promise<Product[]> {
  "use cache";
  cacheTag("products");
  cacheLife("minutes");

  const rows = await selectProducts().orderBy(desc(products.createdAt), products.slug).limit(limit);
  return rows.map(toProduct);
}

/** Same-category products first, then others, excluding the current product. */
export async function getRelatedProducts(
  current: Pick<Product, "id" | "categoryId">,
  limit = 4,
): Promise<Product[]> {
  "use cache";
  cacheTag("products");
  cacheLife("minutes");

  const rows = await selectProducts()
    .where(ne(products.id, current.id))
    .orderBy(
      desc(sql`${products.categoryId} = ${current.categoryId}`),
      desc(products.createdAt),
      products.slug,
    )
    .limit(limit);
  return rows.map(toProduct);
}
