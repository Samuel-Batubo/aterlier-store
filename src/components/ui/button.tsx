import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  inverse: "btn-inverse",
} as const;

export type ButtonVariant = keyof typeof variants;

/** Class string for button styling, usable on <Link> or <a> as well. */
export function buttonClasses(variant: ButtonVariant = "primary", className?: string) {
  return cn("btn", variants[variant], className);
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
};

export function Button({ variant = "primary", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, className)} {...props} />;
}
