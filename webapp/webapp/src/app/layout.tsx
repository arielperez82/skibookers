import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import MainLayout from "@shared/adapters/web-ui/layouts/MainLayout";
import { AppProvider } from "@webapp/providers/AppProvider";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ski Bookers",
  description: "Guided ski trip booking with personalized resort and bundle recommendations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background text-foreground">
      <body className={`${montserrat.variable} ${inter.variable} antialiased bg-background text-foreground`}>
        <AppProvider>
          <MainLayout>            
              {children}
          </MainLayout>
        </AppProvider>
      </body>
    </html>
  );
} 