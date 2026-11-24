import type { ReactNode } from "react";

type Item = { title: string; content: ReactNode; defaultOpen?: boolean };

/** Hairline-divided disclosure list built on native <details> (no JS, keyboard accessible). */
export function ProductAccordion({ items }: { items: Item[] }) {
  return (
    <div className="hairline-t">
      {items.map((item) => (
        <details key={item.title} open={item.defaultOpen} className="group hairline-b">
          <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-eyebrow [&::-webkit-details-marker]:hidden">
            {item.title}
            <span
              aria-hidden
              className="relative size-3 before:absolute before:top-1/2 before:left-0 before:h-px before:w-3 before:bg-ink after:absolute after:top-0 after:left-1/2 after:h-3 after:w-px after:bg-ink after:transition-transform after:duration-(--duration-base) group-open:after:scale-y-0"
            />
          </summary>
          <div className="pb-6 text-body text-muted">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
