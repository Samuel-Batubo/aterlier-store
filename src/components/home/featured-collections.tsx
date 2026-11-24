import Image from "next/image";
import Link from "next/link";
import { featuredCollections } from "@/lib/sample-data";
import { SectionHeading } from "./section-heading";

export function FeaturedCollections() {
  return (
    <section aria-labelledby="collections-title" className="py-section">
      <div className="container-site">
        <SectionHeading id="collections-title" eyebrow="Discover" title="Featured Collections" />

        <ul className="grid grid-cols-2 gap-x-grid-gap gap-y-10 lg:grid-cols-4">
          {featuredCollections.map((c) => (
            <li key={c.slug}>
              <Link href={c.href} className="group flex flex-col gap-4">
                <div className="media-well aspect-editorial">
                  <Image
                    src={c.image.src}
                    alt={c.image.alt}
                    fill
                    sizes="(min-width: 64rem) 25vw, 50vw"
                    className="object-cover transition-transform duration-(--duration-slow) ease-luxe group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h3 className="text-eyebrow">{c.title}</h3>
                  <span className="text-nav text-muted link-reveal group-hover:bg-size-[100%_1px]">
                    Shop Now
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
