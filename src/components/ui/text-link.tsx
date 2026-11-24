import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type TextLinkProps = ComponentProps<typeof Link> & {
  /** "inline" keeps an underline (body copy); "reveal" draws it on hover (nav, meta). */
  variant?: "inline" | "reveal";
};

export function TextLink({ variant = "inline", className, ...props }: TextLinkProps) {
  return (
    <Link className={cn(variant === "inline" ? "link" : "link-reveal", className)} {...props} />
  );
}
