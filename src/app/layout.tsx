import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { Preloader } from "@/components/experience/preloader";
import { Cursor } from "@/components/experience/cursor";
import { seo } from "@/data/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Editorial display serif — italic accents only, never body text.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://david-wafula-portfolio.vercel.app"),
  title: {
    default: seo.title,
    template: "%s | David Wafula",
  },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: "David Wafula" }],
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: "/",
    siteName: "David Wafula — Engineering Portfolio",
    type: "profile",
    images: [{ url: "/images/hero-plant.webp", width: 1536, height: 768, alt: "Chemical process plant at dusk" }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0D1310" },
    { media: "(prefers-color-scheme: light)", color: "#F7F8F7" },
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "David Wafula",
  jobTitle: "Graduate Chemical & Process Engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Moi University",
  },
  knowsAbout: [
    "Chemical Engineering",
    "Process Design",
    "Process Simulation",
    "Reaction Engineering",
    "Separation Processes",
    "Process Control",
    "Mass and Energy Balances",
    "Process Safety",
  ],
  address: { "@type": "PostalAddress", addressCountry: "KE" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScroll>
            <Preloader />
            <Cursor />
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
