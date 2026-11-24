import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Image as ImageData } from "@/lib/catalog-types";

/**
 * Mobile/tablet: edge-to-edge, horizontally swipeable (scroll-snap) when there are several images.
 * Desktop: images stacked vertically at full column width, scrolling past the sticky info panel.
 */
export function ProductGallery({ images, dimmed = false }: { images: ImageData[]; dimmed?: boolean }) {
  const multiple = images.length > 1;

  return (
    <div
      role="group"
      aria-label="Product images"
      className={cn(
        "-mx-gutter lg:mx-0",
        multiple &&
          "flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] lg:flex-col lg:gap-grid-gap lg:overflow-visible",
      )}
    >
      {images.map((img, i) => (
        <div key={img.src} className={cn("media-well aspect-product w-full shrink-0", multiple && "snap-center")}>
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 64rem) 58vw, 100vw"
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
            className={cn("object-cover", dimmed && "opacity-60")}
          />
        </div>
      ))}
    </div>
  );
}
