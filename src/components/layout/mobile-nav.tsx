"use client";

import Link from "next/link";
import { useRef } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";

type NavItem = { label: string; href: string };

/** Full-height drawer built on <dialog>: native focus trapping, Escape to close, inert background. */
export function MobileNav({ items }: { items: readonly NavItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        className="-ml-2 p-2 lg:hidden"
        onClick={() => dialogRef.current?.showModal()}
      >
        <MenuIcon />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        className="m-0 h-dvh max-h-none w-full max-w-sm bg-paper text-ink backdrop:bg-overlay open:flex open:flex-col"
        onClick={(e) => {
          // Clicking the backdrop (the dialog element itself) closes the drawer.
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="flex h-(--header-height) shrink-0 items-center justify-between px-gutter hairline-b">
          <span className="text-eyebrow">Menu</span>
          <button type="button" aria-label="Close menu" className="-mr-2 p-2" onClick={close}>
            <CloseIcon />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-gutter py-6">
          <ul>
            {items.map((item) => (
              <li key={item.href} className="hairline-b">
                <Link
                  href={item.href}
                  onClick={close}
                  className="block py-5 font-serif text-display-sm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-4 px-gutter py-6 hairline-t">
          <Link href="/account" onClick={close} className="text-nav">
            Sign In
          </Link>
          <Link href="/contact" onClick={close} className="text-nav text-muted">
            Contact Us
          </Link>
        </div>
      </dialog>
    </>
  );
}
