import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تسهیلات جدید",
  description: "تسهیلات جدید"
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
