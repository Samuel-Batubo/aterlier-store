import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/home/section-heading";
import { AddToBag } from "@/components/product/add-to-bag";
import { ProductAccordion } from "@/components/product/product-accordion";
import { ProductCard } from "@/components/product/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { StockIndicator } from "@/components/product/stock-indicator";
import { Breadcrumbs, buttonClasses } from "@/components/ui";
import { formatPrice } from "@/lib/format";
import { getProduct, getProductSlugs, getRelatedProducts } from "@/lib/catalog";
import { getStockState } from "@/lib/stock";

export async function generateStaticParams() {
  return (await getProductSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: { title: product.name, description: product.description, images: [product.image.src] },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();

  const stock = getStockState(product.stock);
  const soldOut = stock.status === "sold_out";
  const related = await getRelatedProducts({ id: product.id, categoryId: product.categoryId });
  const images = [product.image, ...product.gallery];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    category: product.category,
    description: product.description,
    image: images.map((i) => i.src),
    offers: {
      "@type": "Offer",
      price: (product.price / 100).toFixed(2),
      priceCurrency: product.currency,
      availability: soldOut ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="container-site">
        <div className="py-5">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: product.category, href: product.categoryHref },
              { label: product.name },
            ]}
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 xl:gap-24">
          <ProductGallery images={images} dimmed={soldOut} />

          <div className="lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start lg:pt-8">
            <div className="flex flex-col gap-6 lg:max-w-md">
              <div className="flex flex-col gap-3">
                <Link href={product.categoryHref} className="text-eyebrow self-start text-muted link-reveal">
                  {product.category}
                </Link>
                <h1 className="font-serif text-display-sm">{product.name}</h1>
                <p className="text-lead tabular-nums">{formatPrice(product.price, product.currency)}</p>
              </div>

              <StockIndicator quantity={product.stock} />

              <div className="flex flex-col gap-3">
                <AddToBag soldOut={soldOut} />
                <Link href="/contact" className={buttonClasses("secondary", "w-full")}>
                  Book an Appointment
                </Link>
              </div>

              <p className="text-body text-muted">{product.description}</p>

              <ProductAccordion
                items={[
                  {
                    title: "Product Details",
                    defaultOpen: true,
                    content: (
                      <ul className="flex flex-col gap-1.5">
                        {product.details.map((d) => (
                          <li key={d} className="before:mr-2 before:content-['—']">
                            {d}
                          </li>
                        ))}
                        <li className="pt-2 text-caption tracking-label uppercase">Style {product.sku}</li>
                      </ul>
                    ),
                  },
                  { title: "Materials & Care", content: <p>{product.care}</p> },
                  {
                    title: "Shipping & Returns",
                    content: (
                      <p>
                        Complimentary shipping on every order, delivered in signature packaging. Returns and
                        exchanges are free within 30 days of delivery.
                      </p>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <section aria-labelledby="related-title" className="mt-section-sm py-section hairline-t">
        <div className="container-site">
          <SectionHeading id="related-title" eyebrow="Discover" title="You May Also Like" />
          {/* 4 items: hide the 4th in the 3-column range so no row is left with one orphan. */}
          <ul className="grid-products md:max-xl:[&>li:nth-child(n+4)]:hidden">
            {related.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
