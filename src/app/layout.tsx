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
  title: "Bucket The Kid | Press Play, Kick Back, Stay Awhile",
  description:
    "Bucket The Kid — progressive DJ and bedroom producer. Genre-fluid music that feels lived-in rather than manufactured. Hip-hop, electronic, indie, laid-back grooves — if the vibe fits, it rides.",
  openGraph: {
    title: "Bucket The Kid",
    description: "Press play, kick back, and stay awhile.",
    type: "website",
  },
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
      <body className="min-h-screen bg-bucket-void text-white overflow-x-hidden">
        <LenisProvider>
          <AudioProvider>{children}</AudioProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
