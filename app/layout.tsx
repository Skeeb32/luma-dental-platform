import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luma RCM | Revenue cycle clarity for dental practices",
  description: "A dental revenue cycle workspace and clinical supply marketplace."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
