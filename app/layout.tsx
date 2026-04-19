import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { ScrollAnimateInit } from "@/components/scroll-animate-init";
import { StudyNavLink } from "@/components/study/shared/study-nav-link";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans"
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wonbee.kr"),
  alternates: {
    canonical: "https://wonbee.kr"
  },
  title: {
    default: "Wonbee Park | Propulsion and Systems Engineering",
    template: "%s | Wonbee Park"
  },
  description:
    "Portfolio of Wonbee Park: propulsion development, research execution, fabrication capability, and design-build-test engineering growth.",
  openGraph: {
    title: "Wonbee Park | Propulsion and Systems Engineering",
    description:
      "Propulsion projects, VTVL research, Samsung Humantech Gold distinction, fabrication work, and public technical communication.",
    url: "https://wonbee.kr",
    siteName: "Wonbee Park",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Wonbee Park engineering portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Wonbee Park | Propulsion and Systems Engineering",
    description:
      "Engineering portfolio featuring propulsion progression, hands-on build capability, and Samsung Humantech Gold work.",
    images: ["/og-image.svg"]
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans text-warm-white antialiased noise-overlay">
        <ScrollProgress />
        <ScrollAnimateInit />
        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
          <SiteHeader studySlot={<StudyNavLink />} />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
