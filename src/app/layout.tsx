import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const SITE_URL = "https://arslantraders.pk";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Arslan Traders | Office Chairs, Tables & Furniture in Rawalpindi Islamabad Pakistan",
    template: "%s | Arslan Traders",
  },
  description:
    "Shop premium office furniture in Rawalpindi, Islamabad & across Pakistan. Executive chairs, office tables, workstations, conference tables, sofas, cabinets. Cash on Delivery (COD) & pre-payment options. Free delivery in twin cities. 4.7★ rated on Murree Road, Rawalpindi.",
  keywords: [
    // Primary
    "office furniture Pakistan",
    "office furniture Rawalpindi",
    "office furniture Islamabad",
    "office chairs Pakistan",
    "office tables Pakistan",
    "Arslan Traders",
    // City-specific
    "office chairs Rawalpindi",
    "office chairs Islamabad",
    "office tables Rawalpindi",
    "office tables Islamabad",
    "office furniture Lahore",
    "office furniture Karachi",
    "office furniture Peshawar",
    // Product-specific
    "executive chairs Pakistan",
    "ergonomic office chairs Pakistan",
    "office workstations Pakistan",
    "conference tables Pakistan",
    "office sofas Pakistan",
    "filing cabinets Pakistan",
    "office storage Pakistan",
    "office desks Pakistan",
    "computer chairs Pakistan",
    "boss chair Pakistan",
    "visitor chairs Pakistan",
    "reception chairs Pakistan",
    // Intent-based
    "buy office chairs online Pakistan",
    "office furniture store near me",
    "office furniture shop Rawalpindi",
    "office furniture wholesale Pakistan",
    "bulk office furniture Pakistan",
    "office furniture supplier Pakistan",
    "modular office furniture Pakistan",
    "business furniture Pakistan",
    "corporate office furniture",
    "home office furniture Pakistan",
    // Payment-related
    "office furniture cash on delivery",
    "office furniture COD Pakistan",
    "office furniture installment",
    // Brand & location
    "Murree Road furniture shop",
    "Arslan Traders Rawalpindi",
    "Fatima Tower Murree Road",
    "furniture store Rawalpindi",
    "furniture store Islamabad",
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
    title: "Arslan Traders | Office Chairs, Tables & Furniture in Rawalpindi Islamabad Pakistan",
    description:
      "Premium office furniture in Rawalpindi, Islamabad & across Pakistan. Executive chairs, office tables, workstations, sofas, cabinets. COD & pre-payment. Free delivery in twin cities. 4.7★ rated.",
    siteName: "Arslan Traders",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Arslan Traders - Office Furniture Store Rawalpindi Islamabad Pakistan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arslan Traders | Office Furniture Rawalpindi Islamabad Pakistan",
    description:
      "Premium office furniture in Rawalpindi, Islamabad & Pakistan. Executive chairs, office tables, workstations, sofas. COD & pre-payment. Free delivery twin cities.",
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
    "geo.placename": "Rawalpindi, Islamabad, Pakistan",
    "geo.position": "33.6014;73.0519",
    "ICBM": "33.6014, 73.0519",
    "format-detection": "telephone=yes",
    "theme-color": "#0A0A0A",
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
  alternateName: "Arslan Traders Office Furniture",
  description:
    "Pakistan's trusted office furniture store in Rawalpindi & Islamabad. Shop executive chairs, office tables, workstations, conference tables, sofas, and storage cabinets. Cash on Delivery available. Free delivery in twin cities.",
  url: SITE_URL,
  telephone: "+92-334-5121727",
  priceRange: "PKR 5,000 - PKR 200,000",
  currenciesAccepted: "PKR",
  paymentAccepted: "Cash on Delivery, Bank Transfer, Mobile Wallet, Cash",
  image: `${SITE_URL}/og-image.jpg`,
  slogan: "Office Furniture Built to Inspire",
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
    { "@type": "City", name: "Lahore" },
    { "@type": "City", name: "Karachi" },
    { "@type": "City", name: "Peshawar" },
    { "@type": "Country", name: "Pakistan" },
  ],
  knowsAbout: [
    "Office Chairs",
    "Office Tables",
    "Office Workstations",
    "Conference Tables",
    "Office Sofas",
    "Filing Cabinets",
    "Executive Chairs",
    "Ergonomic Chairs",
    "Modular Office Furniture",
    "Bulk Office Furniture",
  ],
  sameAs: [
    "https://www.google.com/maps/place/Arslan+Traders",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Office Furniture Catalog",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Office Chairs" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Office Tables" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Office Workstations" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Conference Tables" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Office Sofas" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Filing Cabinets" } },
    ],
  },
};

const productCatalogLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Office Furniture Catalog - Arslan Traders",
  description: "Browse our full range of office furniture including chairs, tables, workstations, and storage.",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Arslan Traders",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+92-334-5121727",
    contactType: "sales",
    areaServed: "PK",
    availableLanguage: ["English", "Urdu"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop No.1, Fatima Tower, Naz Cinema Chowk, Murree Road",
    addressLocality: "Rawalpindi",
    postalCode: "44000",
    addressCountry: "PK",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
      </head>
      <body
        className={`${fraunces.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
