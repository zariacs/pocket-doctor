import Header from "./components/header";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
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
    // Clerk wrapping the entire app for authentication and session management
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {/* The below divs are for styling purposes */}
          <div className="body-container">
            <div className="main-container">{children}</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
