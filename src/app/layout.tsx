import type { Metadata } from "next";
import { Onest } from "next/font/google";
import { baseMetadata } from "@/utils/metadata";
import "./globals.css";
import { Navigation, Footer } from "@/components/ui";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${onest.variable} antialiased`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
