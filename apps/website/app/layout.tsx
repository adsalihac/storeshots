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
      <body>{children}</body>
    </html>
  );
}
