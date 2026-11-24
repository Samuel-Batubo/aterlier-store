import Image from "next/image";
import Link from "next/link";
import { buttonClasses } from "@/components/ui";
import { editorial } from "@/lib/sample-data";

/** Image-led story: image fills half the viewport on desktop, text centered in the other half. */
export function EditorialSplit() {
  return (
    <section aria-labelledby="editorial-title" className="grid bg-surface md:grid-cols-2">
      <div className="media-well aspect-editorial md:aspect-auto md:min-h-[44rem]">
        <Image
          src={editorial.image.src}
          alt={editorial.image.alt}
          fill
          sizes="(min-width: 48rem) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-6 px-gutter py-section text-center">
        <p className="text-eyebrow text-muted">{editorial.eyebrow}</p>
        <h2 id="editorial-title" className="font-serif text-display-md">
          {editorial.title}
        </h2>
        <p className="max-w-sm text-lead text-muted">{editorial.body}</p>
        <Link href={editorial.cta.href} className={buttonClasses("secondary", "mt-2")}>
          {editorial.cta.label}
        </Link>
      </div>
    </section>
  );
}
