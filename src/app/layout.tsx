import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gri Su Arıtma Sistemi - Dijital İkiz",
  description: "Evsel gri su arıtma sisteminin dijital izleme ve simülasyon paneli",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
