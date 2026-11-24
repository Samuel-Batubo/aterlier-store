// Client-safe view types for catalog data. Rows are mapped to these in src/lib/catalog.ts.

export type Image = { src: string; alt: string };

export type Product = {
  id: string;
  slug: string;
  sku: string;
  name: string;
  categoryId: string;
  category: string;
  categoryHref: string;
  price: number; // minor units (cents)
  currency: string;
  href: string;
  /** Primary image, used on listings and first in the product gallery. */
  image: Image;
  /** Additional gallery images. */
  gallery: Image[];
  badge: string | null;
  /** Units available; 0 = sold out. */
  stock: number;
  description: string;
  details: string[];
  care: string;
};
