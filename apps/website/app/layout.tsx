import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://storeshots.dev"),
  title: "Storeshots - Generate App Store Screenshots in One Command",
  description:
    "Automatically discover Expo Router routes, capture screenshots, and export App Store and Play Store assets.",
  openGraph: {
    title: "Storeshots",
    description: "Generate App Store screenshots from Expo apps.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/icons/favicon.svg" />
        <link rel="apple-touch-icon" href="/icons/app-icon-192.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>{children}</body>
    </html>
  );
}
