import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  spacing?: "default" | "sm" | "none";
  divider?: boolean;
};

/** Vertical rhythm block. Pair with <Container> for horizontal bounds. */
export function Section({
  spacing = "default",
  divider = false,
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        spacing === "default" && "py-section",
        spacing === "sm" && "py-section-sm",
        divider && "hairline-t",
        className,
      )}
      {...props}
    />
  );
}
