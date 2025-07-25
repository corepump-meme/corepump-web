import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Web3Provider, ApolloProvider } from "@/components/providers";
import { Header, MobileMenuProvider, MobileMenuOverlay } from "@/components/layout/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CorePump.meme - Coming Soon | Fair Token Launchpad on Core Chain",
  description: "The first fair launchpad on Core Chain where liquidity is burned, whales are locked, and communities can actually win. Stop getting rugged. Start pumping.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background-primary text-text-primary transition-colors duration-200`}
      >
        <ApolloProvider>
          <Web3Provider>
            <MobileMenuProvider>
              <Header />
              <main className="">
                {children}
              </main>
              <MobileMenuOverlay />
            </MobileMenuProvider>
          </Web3Provider>
        </ApolloProvider>
      </body>
    </html>
  );
}
