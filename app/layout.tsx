import React from "react";
import '@/styles/globals.css';
import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Home",
  description: "Online Epub Reader",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased transition-colors",
          fontSans.variable
        )}>
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
          {children}
          <Toaster expand={true} visibleToasts={10} richColors toastOptions={{ duration: 20000 }}/>
				</ThemeProvider>
        </body>
    </html>
  );
}
