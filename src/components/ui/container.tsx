import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

const sizes = {
  site: "container-site",
  content: "container-content",
  narrow: "container-narrow",
} as const;

type ContainerProps<T extends ElementType> = {
  as?: T;
  size?: keyof typeof sizes;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/** Centered, max-width wrapper with fluid side gutters. */
export function Container<T extends ElementType = "div">({
  as,
  size = "content",
  className,
  ...props
}: ContainerProps<T>) {
  const Tag: ElementType = as ?? "div";
  return <Tag className={cn(sizes[size], className)} {...props} />;
}
