import Link from "next/link";
import { buttonClasses } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container-narrow flex flex-col items-center gap-6 py-section text-center">
      <p className="text-eyebrow text-muted">404</p>
      <h1 className="font-serif text-display-md">Page Not Found</h1>
      <p className="max-w-sm text-lead text-muted">
        The page you’re looking for doesn’t exist or is no longer available.
      </p>
      <Link href="/" className={buttonClasses("primary", "mt-2")}>
        Return Home
      </Link>
    </section>
  );
}
