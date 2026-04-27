import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import ThemeToggle from "./ThemeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portal Rujukan Undang-Undang",
  description: "Sistem rujukan pantas Akta, Enakmen, dan Hukum Syarak",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

          {/* Ini butang suis lampu kita letak penjuru kanan atas */}
          <div className="absolute top-6 right-6 z-50">
            <ThemeToggle />
          </div>

          {/* Ini isi kandungan muka surat kita */}
          {children}

        </ThemeProvider>
      </body>
    </html>
  );
}