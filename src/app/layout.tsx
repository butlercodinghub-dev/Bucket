import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import AudioProvider from "@/components/providers/AudioProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bucketthekid.com"),

  title: {
    default: "Bucket The Kid | Press Play, Kick Back, Stay Awhile",
    template: "%s | Bucket The Kid",
  },
  description:
    "Bucket The Kid — progressive DJ and bedroom producer. Genre-fluid music that feels lived-in rather than manufactured. Hip-hop, electronic, indie, laid-back grooves — if the vibe fits, it rides.",

  keywords: [
    "Bucket The Kid",
    "BucketTheKid",
    "bucket the kid music",
    "bedroom producer",
    "indie hip hop",
    "electronic music",
    "Mango Fruit Girl",
    "Pull Me Under",
    "My Mistake",
    "Pour Out the Bottle",
    "lo-fi hip hop",
    "genre-fluid music",
  ],
  authors: [{ name: "Bucket The Kid" }],
  creator: "Bucket The Kid",

  openGraph: {
    type: "website",
    url: "https://bucketthekid.com",
    siteName: "Bucket The Kid",
    title: "Bucket The Kid | Press Play, Kick Back, Stay Awhile",
    description:
      "Genre-fluid music that feels lived-in rather than manufactured. Press play, kick back, and stay awhile.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bucket The Kid — Artist Banner",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@bucketthekid",
    creator: "@bucketthekid",
    title: "Bucket The Kid | Press Play, Kick Back, Stay Awhile",
    description:
      "Genre-fluid music that feels lived-in rather than manufactured. Press play, kick back, and stay awhile.",
    images: ["/og-image.jpg"],
  },

  alternates: {
    canonical: "https://bucketthekid.com",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/manifest.json",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "Bucket The Kid",
  url: "https://bucketthekid.com",
  image: "https://bucketthekid.com/og-image.jpg",
  description:
    "Bucket The Kid — progressive DJ and bedroom producer. Genre-fluid music that feels lived-in rather than manufactured.",
  genre: ["Hip-Hop", "Electronic", "Indie", "Lo-fi"],
  sameAs: [
    "https://open.spotify.com/artist/5MkblgFYqw5F91W1cMcSiK",
    "https://www.instagram.com/bucketthekid/",
    "https://www.tiktok.com/@bucketthekid",
    "https://youtube.com/channel/UCUPjxlk-XRp4TgWk4lhzERw",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-bucket-void text-white overflow-x-hidden">
        <LenisProvider>
          <AudioProvider>{children}</AudioProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
