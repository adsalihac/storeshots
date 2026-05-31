import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://docs.storeshots.dev"),
  title: {
    template: "%s - Storeshots Docs",
    default: "Storeshots Docs"
  },
  description: "Documentation for the Storeshots Expo screenshot generation CLI."
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
