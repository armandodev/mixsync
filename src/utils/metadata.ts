import type { Metadata } from "next";

export const SITE_URL = "https://mixsync.vercel.app";
export const SITE_NAME = "MixSync";
export const DEFAULT_TITLE = "MixSync - Busca y descarga música fácilmente";
export const DEFAULT_DESCRIPTION =
  "Busca tus canciones favoritas en Spotify y YouTube y obtén nombres de archivo sugerido y URLs para descargarlas en una plataforma.";
export const OG_IMAGE_WEBP = "/og-banner.webp";
export const OG_IMAGE_PNG = "/og-banner.png";
export const OG_IMAGE_SIZES = [
  { url: OG_IMAGE_PNG, width: 1200, height: 630, alt: DEFAULT_TITLE },
  { url: OG_IMAGE_WEBP, width: 1200, height: 630, alt: DEFAULT_TITLE },
];

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [
    {
      name: "Jorge Armando Ceras Cárdenas",
      url: `https://armandodev-portfolio.vercel.app/`,
    },
  ],
  alternates: {
    canonical: SITE_URL,
    languages: {
      "es-MX": `${SITE_URL}/`,
    },
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: OG_IMAGE_SIZES,
    locale: "es_MX",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    creator: "@armandx06",
    images: [OG_IMAGE_PNG],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/logo.svg" }],
  },
};
