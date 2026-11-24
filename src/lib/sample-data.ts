// Placeholder editorial content (navigation, campaigns, collection tiles, footer).
// Products, categories and stock come from the database via src/lib/catalog.ts.
// Images are from Unsplash (https://unsplash.com/license).
import type { Image } from "./catalog-types";

// Width and quality are added per request by src/lib/image-loader.ts.
const unsplash = (id: string) => `https://images.unsplash.com/${id}?fit=crop`;

export type Collection = {
  slug: string;
  title: string;
  href: string;
  image: Image;
};

export const navigation = [
  { label: "New In", href: "/new-in" },
  { label: "Women", href: "/collections/women" },
  { label: "Men", href: "/collections/men" },
  { label: "Bags", href: "/collections/bags" },
  { label: "Shoes", href: "/collections/shoes" },
  { label: "Jewelry", href: "/collections/jewelry" },
] as const;

export const hero = {
  eyebrow: "Autumn–Winter 2026",
  title: "The New Season",
  panels: [
    {
      label: "Women",
      href: "/collections/women",
      image: {
        src: unsplash("photo-1483985988355-763728e1935b"),
        alt: "Woman in a burgundy wool coat and sunglasses carrying shopping bags",
      },
    },
    {
      label: "Men",
      href: "/collections/men",
      image: {
        src: unsplash("photo-1507679799987-c73779587ccf"),
        alt: "Man in a navy suit adjusting his jacket",
      },
    },
  ],
};

export const featuredCollections: Collection[] = [
  {
    slug: "women",
    title: "Women’s Outerwear",
    href: "/collections/women",
    image: {
      src: unsplash("photo-1485968579580-b6d095142e6e"),
      alt: "Woman in an oversized plaid coat on a city street",
    },
  },
  {
    slug: "men",
    title: "Men’s Tailoring",
    href: "/collections/men",
    image: {
      src: unsplash("photo-1617137968427-85924c800a22"),
      alt: "Man in a blue suit walking past a glass storefront",
    },
  },
  {
    slug: "bags",
    title: "Handbags",
    href: "/collections/bags",
    image: {
      src: unsplash("photo-1584917865442-de89df76afd3"),
      alt: "Red leather top-handle bag on a display",
    },
  },
  {
    slug: "jewelry",
    title: "Fine Jewelry",
    href: "/collections/jewelry",
    image: {
      src: unsplash("photo-1599643478518-a784e5dc4c8f"),
      alt: "Gold chain necklaces with a crescent pendant",
    },
  },
];

export const editorial = {
  eyebrow: "The Edit",
  title: "Prints in Motion",
  body: "Fluid silhouettes cut from printed silk, made to move with you from the first warm evening to the last.",
  cta: { label: "Discover the Edit", href: "/edits/prints-in-motion" },
  image: {
    src: unsplash("photo-1496747611176-843222e1e57c"),
    alt: "Woman in a floral wrap dress by the sea",
  },
};

export const campaign = {
  eyebrow: "The Atelier",
  title: "Made to Last",
  body: "Every piece begins in our workshop, cut and finished by hand in small runs.",
  cta: { label: "Our Craft", href: "/about" },
  image: {
    src: unsplash("photo-1490481651871-ab68de25d43d"),
    alt: "A rail of neutral-toned garments in a bright studio",
  },
};

export const services = [
  { title: "Complimentary Shipping", body: "On every order, delivered in signature packaging." },
  { title: "Free Returns", body: "Return or exchange within 30 days of delivery." },
  { title: "Book an Appointment", body: "Shop in store or by video with a client advisor." },
  { title: "Gift Wrapping", body: "Add a handwritten note and wrapping at checkout." },
];

export const footerColumns = [
  {
    title: "Client Services",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "The Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Sustainability", href: "/sustainability" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Sale", href: "/terms" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
];
