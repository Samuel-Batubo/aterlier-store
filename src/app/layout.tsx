import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

// UI / body: neutral grotesk.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Editorial display: high-contrast serif, used sparingly for headlines.
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Atelier",
    template: "%s | Atelier",
  },
  description: "Atelier store",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${bodoni.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
