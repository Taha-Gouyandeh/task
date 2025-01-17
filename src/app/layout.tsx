import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "تسهیلات بانکی",
  description: "تسهیلات بانکی"
};

export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir={"rtl"}>
      <body>
        {children}
      </body>
    </html>
  );
}
