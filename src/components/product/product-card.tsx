import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/catalog-types";
import { getStockState } from "@/lib/stock";

export function ProductCard({ product }: { product: Product }) {
  const soldOut = getStockState(product.stock).status === "sold_out";

  return (
    <Link href={product.href} className="group flex flex-col gap-4">
      <div className="media-well aspect-product">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes="(min-width: 80rem) 25vw, (min-width: 48rem) 33vw, 50vw"
          className={cn(
            "object-cover transition-transform duration-(--duration-slow) ease-luxe group-hover:scale-[1.03]",
            soldOut && "opacity-60",
          )}
        />
      </div>
      <div className="flex flex-col gap-1 px-1">
        <p className="text-caption tracking-label text-muted uppercase">
          {product.badge && !soldOut && <span className="mr-2 font-medium text-ink">{product.badge}</span>}
          {product.category}
        </p>
        <h3 className="text-body-sm">{product.name}</h3>
        <p className="text-price">
          {formatPrice(product.price, product.currency)}
          {soldOut && <span className="ml-2 text-muted">· Sold out</span>}
        </p>
      </div>
    </Link>
  );
}
