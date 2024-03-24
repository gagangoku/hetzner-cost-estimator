import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const fontFamily = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Hetzer cloud cost estimator",
    description: "A simple UI to see your cloud costs",
    // icons: 'https://console.hetzner.cloud/favicon-32x32.png',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={fontFamily.className}>{children}</body>
        </html>
    );
}
