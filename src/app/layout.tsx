import type { Metadata } from "next";

// Metadata
import { meta } from "@/data/metadata";

// CSS
import "./globals.css";

export const metadata: Metadata = meta

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
