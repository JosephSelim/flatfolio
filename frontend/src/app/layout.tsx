import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flatfolio",
  description: "Apartment listing app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800 font-sans antialiased">
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
