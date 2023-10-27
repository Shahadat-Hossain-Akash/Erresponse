import Navbar from "@/components/Navbar";
import "./globals.css";
import { Quicksand } from "next/font/google";
import { Providers } from "./providers";
import AuthProvider from "./auth/Providers";

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
});

export const metadata = {
  title: "Erresponse - An Issue tracker",
  description: "An project issue tracking app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className={quicksand.variable}>
        <AuthProvider>
          <Providers>
            <Navbar />
            <main className={`px-4 md:px-12 flex max-w-screen`}>
              {children}
            </main>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
