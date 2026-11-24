import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

type SectionHeadingProps = {
  id: string;
  eyebrow?: string;
  title: string;
  action?: { label: string; href: string };
};

export function SectionHeading({ id, eyebrow, title, action }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-col items-center gap-3 text-center md:mb-12">
      {eyebrow && <p className="text-eyebrow text-muted">{eyebrow}</p>}
      <h2 id={id} className="font-serif text-display-sm">
        {title}
      </h2>
      {action && (
        <Link href={action.href} className="text-nav link-reveal mt-1 inline-flex items-center gap-2">
          {action.label}
          <ArrowRightIcon />
        </Link>
      )}
    </div>
  );
}
