import Image from "next/image";
import Link from "next/link";
import { buttonClasses } from "@/components/ui";
import { hero } from "@/lib/sample-data";

/** Full-bleed split campaign image with one shared headline and a CTA per side. */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="grid h-[78svh] max-h-[52rem] min-h-[30rem] grid-cols-2 md:h-[calc(100svh-var(--header-height)-var(--announcement-height))] md:max-h-[64rem]">
        {hero.panels.map((panel) => (
          <div key={panel.href} className="media-well">
            <Image
              src={panel.image.src}
              alt={panel.image.alt}
              fill
              sizes="50vw"
              loading="eager"
              fetchPriority="high"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-ink/60 via-ink/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-5 px-gutter pb-10 text-center text-paper md:gap-6 md:pb-16">
        <p className="text-eyebrow">{hero.eyebrow}</p>
        <h1 id="hero-title" className="font-serif text-display-lg">
          {hero.title}
        </h1>
        <div className="mt-2 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:w-auto sm:flex-row sm:gap-4">
          {hero.panels.map((panel) => (
            <Link key={panel.href} href={panel.href} className={buttonClasses("inverse", "sm:min-w-48")}>
              Shop {panel.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
