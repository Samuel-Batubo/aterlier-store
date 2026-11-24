import Link from "next/link";
import { cn } from "@/lib/cn";

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Atelier home"
      className={cn(
        "font-serif text-2xl leading-none tracking-[0.28em] uppercase lg:text-[1.75rem]",
        className,
      )}
    >
      Atelier
    </Link>
  );
}
