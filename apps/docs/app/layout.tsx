import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://docs.shotify.dev"),
  title: {
    template: "%s - Shotify Docs",
    default: "Shotify Docs"
  },
  description: "Documentation for the Shotify Expo screenshot generation CLI."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
