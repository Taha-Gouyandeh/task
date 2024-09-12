import type {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
  title: "NotFound",
  description: "NotFound page",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fa" dir={"rtl"}>
      <body>{children}</body>
    </html>
  );
}
