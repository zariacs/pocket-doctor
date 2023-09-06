import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Header from "./components/header";
import "bootstrap/dist/css/bootstrap.css";
import "material-symbols";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Favourite Doctor",
  description: "Welcome to the office of your favourite doctor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <div className="body-container">
            <div className="main-container">{children}</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
