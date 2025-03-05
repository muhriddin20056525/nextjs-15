import React, { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Next.js",
  description: "Generate by Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <header className="w-full p-10 bg-blue-600 text-white">
          <p>Header</p>
        </header>
        {children}
        <footer className="w-full p-10 bg-green-600 text-white">
          <p>Footer</p>
        </footer>
      </body>
    </html>
  );
}
