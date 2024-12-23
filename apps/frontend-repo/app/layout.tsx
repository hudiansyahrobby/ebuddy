import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AppTheme from "../theme/AppTheme";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Ebuddy Test",
  description: "Ebuddy Technical Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppTheme>
        <Box
          component="body"
          className={`${geistSans.variable} ${geistMono.variable}`}
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <CssBaseline />
          <Header />

          {children}
          <Footer />
        </Box>
      </AppTheme>
    </html>
  );
}
