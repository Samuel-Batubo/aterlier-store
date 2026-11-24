import Link from "next/link";
import { BagIcon, SearchIcon, UserIcon } from "@/components/icons";
import { navigation } from "@/lib/sample-data";
import { MobileNav } from "./mobile-nav";
import { Wordmark } from "./wordmark";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-paper hairline-b">
      {/* Three-column grid keeps the wordmark optically centered regardless of side content. */}
      <div className="container-site grid h-(--header-height) grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="flex items-center">
          <MobileNav items={navigation} />
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7 xl:gap-9">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-nav link-reveal">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <Wordmark />

        <div className="-mr-2 flex items-center justify-end">
          <Link href="/search" aria-label="Search" className="p-2">
            <SearchIcon />
          </Link>
          <Link href="/account" aria-label="Account" className="hidden p-2 sm:block">
            <UserIcon />
          </Link>
          <Link href="/cart" aria-label="Shopping bag, 0 items" className="relative p-2">
            <BagIcon />
            <span className="absolute top-1 right-0.5 grid size-4 place-items-center rounded-full bg-ink text-[0.625rem] leading-none text-paper">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
