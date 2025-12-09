import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/layout/ChatBot";

export const metadata: Metadata = {
  title: "Laser Presisjon - Profesjonell Lasergravering",
  description: "Profesjonell lasergravering for bedrifter og privatpersoner. Høy kvalitet og rask levering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb">
      <body className="antialiased bg-gray-50">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
