"use client";

import type { ImageLoaderProps } from "next/image";

/**
 * Global next/image loader (configured via `images.loaderFile`).
 *
 * Unsplash URLs are resized by Unsplash's own CDN (imgix params), so the browser fetches
 * exactly the width it needs and the Next.js server never proxies remote images.
 * With a custom loader the built-in /_next/image optimizer is disabled, so any other
 * source is returned unchanged; add a branch here when real product media gets a CDN.
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", url.searchParams.get("fit") ?? "crop");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    return url.toString();
  }
  return src;
}
