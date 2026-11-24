import Image from "next/image";
import Link from "next/link";
import { buttonClasses } from "@/components/ui";
import { campaign } from "@/lib/sample-data";

/** Full-bleed brand story band with overlaid copy. */
export function CampaignBanner() {
  return (
    <section aria-labelledby="campaign-title" className="media-well h-[70svh] max-h-[44rem] min-h-[28rem] md:h-[80svh] md:max-h-[56rem]">
      <Image src={campaign.image.src} alt={campaign.image.alt} fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-ink/30" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-gutter text-center text-paper">
        <p className="text-eyebrow">{campaign.eyebrow}</p>
        <h2 id="campaign-title" className="font-serif text-display-lg">
          {campaign.title}
        </h2>
        <p className="max-w-md text-lead">{campaign.body}</p>
        <Link href={campaign.cta.href} className={buttonClasses("inverse", "mt-2")}>
          {campaign.cta.label}
        </Link>
      </div>
    </section>
  );
}
