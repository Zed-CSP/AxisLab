import type { Metadata } from "next";
import { DM_Mono } from "next/font/google";
import "./globals.css";

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AxisLab",
  description: "Upload and view your MJCF, URDF, and USD robots and environments in a 3D environment.",
  icons: {
    icon: "/images/axisforge-logo.png",
    apple: "/images/axisforge-logo.png",
  },
  openGraph: {
    title: "AxisLab",
    description: "Upload and view your MJCF, URDF, and USD robots and environments in a 3D environment.",
    siteName: "AxisLab",
    locale: "en_US",
    type: "website",
    images: [{ url: "/images/axisforge-logo.png", width: 420, height: 420 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
