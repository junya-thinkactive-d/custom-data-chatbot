import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Custom Data Chatbot",
  description: "A chatbot that helps you manage your data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Navigation />
          <main className="container mx-auto max-w-screen-md flex-1 p-5">
            {children}
          </main>

          <footer className="border-t py-5">
            <div>
              Copyright © All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
