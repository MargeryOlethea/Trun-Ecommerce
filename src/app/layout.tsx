import "./globals.css";
import { nunito } from "./fonts/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trun",
  description: "Trusted E-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${nunito.className}`}>{children}</body>
    </html>
  );
}
