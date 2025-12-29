import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zizo App",
  description: "Football tournaments and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
