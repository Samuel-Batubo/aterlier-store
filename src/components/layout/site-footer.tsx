import Link from "next/link";
import { footerColumns } from "@/lib/sample-data";
import { NewsletterForm } from "./newsletter-form";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="container-site py-section-sm">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr] lg:gap-16">
          <div className="flex flex-col gap-5">
            <h2 className="text-eyebrow">Sign up for updates</h2>
            <p className="max-w-sm text-body text-paper/70">
              Be the first to hear about new collections, private events and editorial stories.
            </p>
            <NewsletterForm />
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerColumns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="text-eyebrow mb-5">{col.title}</h2>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="link-reveal text-body text-paper/70 transition-colors hover:text-paper"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-paper/15">
        <div className="container-site flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <span className="font-serif text-xl tracking-[0.28em] uppercase">Atelier</span>
          <p className="text-caption text-paper/50">© 2026 Atelier. Sample storefront content.</p>
        </div>
      </div>
    </footer>
  );
}
