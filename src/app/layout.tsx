import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const SITE_URL = "https://arslantraders.pk";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Arslan Traders | Office Furniture, Chairs & Tables in Rawalpindi Islamabad",
    template: "%s | Arslan Traders",
  },
  description:
    "Arslan Traders is the leading office furniture store in Rawalpindi & Islamabad. Shop executive chairs, office tables, workstations, conference tables, sofas & storage. Premium quality, competitive prices, free delivery in twin cities. Located on Murree Road, Rawalpindi.",
  keywords: [
    "office furniture Rawalpindi",
    "office furniture Islamabad",
    "office chairs Rawalpindi",
    "office tables Islamabad",
    "executive chairs Pakistan",
    "office workstations Rawalpindi",
    "conference tables Islamabad",
    "office sofas Pakistan",
    "filing cabinets Rawalpindi",
    "Arslan Traders",
    "Murree Road furniture",
    "office furniture store",
    "modular office furniture",
    "ergonomic chairs Islamabad",
    "business furniture Pakistan",
    "bulk office furniture",
    "office furniture wholesale",
  ],
  authors: [{ name: "Arslan Traders", url: SITE_URL }],
  creator: "Arslan Traders",
  publisher: "Arslan Traders",
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Arslan Traders | Office Furniture, Chairs & Tables in Rawalpindi Islamabad",
    description:
      "Premium office furniture in Rawalpindi & Islamabad. Executive chairs, office tables, workstations, sofas & storage at unbeatable prices. Located on Murree Road.",
    siteName: "Arslan Traders",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Arslan Traders - Office Furniture Store Rawalpindi Islamabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arslan Traders | Office Furniture Rawalpindi Islamabad",
    description:
      "Premium office furniture in Rawalpindi & Islamabad. Executive chairs, office tables, workstations & more. Located on Murree Road.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  category: "business",
  other: {
    "geo.region": "PK-PB",
    "geo.placename": "Rawalpindi, Islamabad",
    "geo.position": "33.6014;73.0519",
    "ICBM": "33.6014, 73.0519",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF7" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
  colorScheme: "light dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  name: "Arslan Traders",
  description:
    "Leading office furniture store in Rawalpindi & Islamabad offering executive chairs, office tables, workstations, conference tables, sofas and storage solutions.",
  url: SITE_URL,
  telephone: "+92-334-5121727",
  priceRange: "PKR 5,000 - PKR 200,000",
  image: `${SITE_URL}/og-image.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop No.1, Fatima Tower, Naz Cinema Chowk, Murree Road, Amirpura Mohalla",
    addressLocality: "Rawalpindi",
    postalCode: "44000",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.6014,
    longitude: 73.0519,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "21:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    reviewCount: "183",
    bestRating: "5",
    worstRating: "1",
  },
  areaServed: [
    { "@type": "City", name: "Rawalpindi" },
    { "@type": "City", name: "Islamabad" },
  ],
  sameAs: [
    "https://www.google.com/maps/place/Arslan+Traders",
  ],
};

const productCatalogLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Office Furniture Catalog - Arslan Traders",
  description: "Browse our full range of office furniture including chairs, tables, workstations, and storage.",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productCatalogLd) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${jakarta.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
