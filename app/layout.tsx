import Navbar from "@/components/Navbar";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import { Quicksand } from "next/font/google";
import { Providers } from "./providers";

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "Erresponse",
  description: "An issue tracking app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={quicksand.variable}>
        <Providers>
          <Navbar />
          <main className={`flex px-12`}>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
