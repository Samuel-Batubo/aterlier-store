import { ProductCard } from "@/components/product/product-card";
import { getNewArrivals } from "@/lib/catalog";
import { SectionHeading } from "./section-heading";

export async function NewArrivals() {
  const newArrivals = await getNewArrivals(8);

  return (
    <section aria-labelledby="new-arrivals-title" className="py-section hairline-t">
      <div className="container-site">
        <SectionHeading
          id="new-arrivals-title"
          eyebrow="Just In"
          title="New Arrivals"
          action={{ label: "View All", href: "/new-in" }}
        />
        {/* 8 items fill 2- and 4-column rows; the 3-column range (md–xl) shows 6 to avoid an orphan row. */}
        <ul className="grid-products md:max-xl:[&>li:nth-child(n+7)]:hidden">
          {newArrivals.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
