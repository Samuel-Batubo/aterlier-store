// Initial catalog, moved from the former placeholder data in src/lib/sample-data.ts.
// Images are from Unsplash (https://unsplash.com/license); src/lib/image-loader.ts adds width/quality.
// Relative imports only: loaded by src/db/seed.ts outside Next.

const unsplash = (id: string) => `https://images.unsplash.com/${id}?fit=crop`;

export const seedCategories = [
  { slug: "bags", name: "Bags" },
  { slug: "shoes", name: "Shoes" },
  { slug: "accessories", name: "Accessories" },
  { slug: "ready-to-wear", name: "Ready-to-Wear" },
  { slug: "jewelry", name: "Jewelry" },
] as const;

type CategorySlug = (typeof seedCategories)[number]["slug"];

export type SeedProduct = {
  slug: string;
  sku: string;
  name: string;
  category: CategorySlug;
  priceCents: number;
  badge?: string;
  stock: number;
  image: { src: string; alt: string };
  gallery?: { src: string; alt: string }[];
  description: string;
  details: string[];
  care: string;
};

/** Listed newest first: the seed sets created_at so New Arrivals keeps this order. */
export const seedProducts: SeedProduct[] = [
  {
    slug: "structured-top-handle-bag",
    sku: "AT-BG-1042",
    name: "Structured Top-Handle Bag",
    category: "bags",
    priceCents: 248000,
    badge: "New",
    stock: 12,
    image: { src: unsplash("photo-1594223274512-ad4803739b7c"), alt: "Teal leather top-handle bag" },
    description:
      "A compact, architectural top-handle bag in pebbled calfskin, finished with a polished push-lock closure and a detachable shoulder strap.",
    details: [
      "Pebbled calfskin with suede lining",
      "Gold-tone push-lock closure",
      "Detachable, adjustable shoulder strap",
      "Interior slip pocket",
      "W 24cm × H 18cm × D 10cm",
    ],
    care: "Store in the dust bag provided, away from direct sunlight. Wipe gently with a soft, dry cloth.",
  },
  {
    slug: "floral-satin-pump",
    sku: "AT-SH-2217",
    name: "Floral Satin Pump",
    category: "shoes",
    priceCents: 89000,
    stock: 3,
    image: { src: unsplash("photo-1543163521-1bf539c55dd2"), alt: "Blue floral satin stiletto pumps" },
    description:
      "A pointed-toe pump in printed duchess satin, set on a slender 100mm stiletto heel for a sharp, elongated line.",
    details: ["Printed duchess satin upper", "Leather lining and sole", "100mm heel", "Made in Italy"],
    care: "Protect from water and humidity. Store with shoe trees in the dust bags provided.",
  },
  {
    slug: "round-metal-sunglasses",
    sku: "AT-AC-0381",
    name: "Round Metal Sunglasses",
    category: "accessories",
    priceCents: 46500,
    stock: 20,
    image: {
      src: unsplash("photo-1511499767150-a48a237f0083"),
      alt: "Round gold-frame sunglasses with green lenses",
    },
    description:
      "Fine round frames in gold-tone metal with bottle-green lenses. Light enough for every day, refined enough for the evening.",
    details: ["Gold-tone metal frame", "Green lenses with 100% UV protection", "Adjustable nose pads", "Case and cloth included"],
    care: "Clean lenses with the cloth provided. Store in the case when not worn.",
  },
  {
    slug: "technical-bomber-jacket",
    sku: "AT-RW-5530",
    name: "Technical Bomber Jacket",
    category: "ready-to-wear",
    priceCents: 195000,
    badge: "New",
    stock: 8,
    image: {
      src: unsplash("photo-1591047139829-d91aecb6caea"),
      alt: "Rust-colored bomber jacket on a hanger",
    },
    description:
      "A lightweight bomber in water-repellent technical nylon, cut with a relaxed body and ribbed collar, cuffs and hem.",
    details: ["Water-repellent technical nylon", "Two-way front zip", "Utility sleeve pocket", "Relaxed fit; true to size"],
    care: "Machine wash cold on a delicate cycle. Do not tumble dry.",
  },
  {
    slug: "leather-biker-jacket",
    sku: "AT-RW-5104",
    name: "Leather Biker Jacket",
    category: "ready-to-wear",
    priceCents: 420000,
    stock: 2,
    image: { src: unsplash("photo-1551028719-00167b16eac5"), alt: "Black leather biker jacket" },
    description:
      "Our signature biker in supple lambskin, with an asymmetric zip, notched lapels and a belted hem. Cut close to the body.",
    details: ["Lambskin leather", "Asymmetric front zip", "Three zip pockets", "Slim fit; consider sizing up for layering"],
    care: "Specialist leather clean only. Hang on a wide, padded hanger.",
  },
  {
    slug: "pearl-strand-necklace",
    sku: "AT-JW-7702",
    name: "Pearl Strand Necklace",
    category: "jewelry",
    priceCents: 132000,
    stock: 0,
    image: {
      src: unsplash("photo-1515562141207-7a88fb7ce338"),
      alt: "Pearl necklace in an open jewelry box",
    },
    description:
      "A single strand of hand-knotted cultured pearls, finished with a pavé sterling silver clasp.",
    details: ["Cultured freshwater pearls, 7–8mm", "Hand-knotted on silk thread", "Sterling silver clasp", "Length 45cm"],
    care: "Put on last, take off first. Wipe with a soft cloth after wearing and store flat.",
  },
  {
    slug: "leather-lace-up-boot",
    sku: "AT-SH-2290",
    name: "Leather Lace-Up Boot",
    category: "shoes",
    priceCents: 118000,
    stock: 6,
    image: { src: unsplash("photo-1608256246200-53e635b5b65f"), alt: "Brown leather lace-up boots" },
    description:
      "A Goodyear-welted lace-up boot in burnished calf leather, built on a rubber-studded leather sole to last for years.",
    details: ["Burnished calf leather", "Goodyear-welted construction", "Leather sole with rubber insert", "Made in Portugal"],
    care: "Condition regularly with neutral cream. Use cedar shoe trees between wears.",
  },
  {
    slug: "panelled-runner-sneaker",
    sku: "AT-SH-2305",
    name: "Panelled Runner Sneaker",
    category: "shoes",
    priceCents: 79000,
    badge: "New",
    stock: 15,
    image: { src: unsplash("photo-1560769629-975ec94e6a86"), alt: "Multicolor panelled sneakers" },
    description:
      "A layered runner in suede, mesh and leather panels with contrast laces and a sculpted, cushioned sole.",
    details: ["Suede, mesh and leather upper", "Cushioned rubber sole", "Removable insole", "Fits true to size"],
    care: "Spot clean with a damp cloth. Do not machine wash.",
  },
];
