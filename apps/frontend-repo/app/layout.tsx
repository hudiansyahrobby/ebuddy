import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "../components/Layouts/Header/Header";
import AppTheme from "../theme/AppTheme";
import ReduxProvider from "../providers/ReduxProvider";

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
      <ReduxProvider>
        <AppTheme>
          <Box
            component="body"
            className={`${geistSans.variable} ${geistMono.variable}`}
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <CssBaseline />
            <Header />

            {children}
          </Box>
        </AppTheme>
      </ReduxProvider>
    </html>
  );
}
