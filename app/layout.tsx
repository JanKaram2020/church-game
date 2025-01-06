import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <title>باركت طبيعتي فيك - حفلة عيد الميلاد ٢٠٢٥</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={"anonymous"}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=El+Messiri:wght@400..700&display=swap"
          rel="stylesheet"
        />
        <link rel="favicon" href="/logo.png" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/logo.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
