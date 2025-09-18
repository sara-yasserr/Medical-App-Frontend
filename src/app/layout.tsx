import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const cairo = Cairo({
  subsets: ["latin"],
  variable: "--font-cairo", // custom CSS variable
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"], // ✅ optional: define weights you want
});

export const metadata: Metadata = {
  title: "Clinic",
  description: "Layout for clinic task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cairo.variable} antialiased`}>
        <Navbar />
        <main className="p-primary">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
