import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "./AuthContext";
import AuthModal from "@/components/AuthModal";
import ClientLayout from "./ClientLayout";

const Onest = localFont({
  src: "./fonts/Onest-VariableFont_wght.ttf",
  variable: "--font-onest",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Movie Summariser",
  description: "A platform to enjoy high-quality summaries of your favorite movies using AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Onest.variable} antialiased font-onest`}
      >
        <AuthProvider>
          <ClientLayout>
            <AuthModal />
            {children}
          </ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
