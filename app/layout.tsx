import { NextAuthProvider } from "@/providers/providers";

import "./globals.css";

export const metadata = {
  title: "Twitter 2.0",
  description: "Clone of Twitter 2.0 created with Sanity CMS and Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <NextAuthProvider>
          <main>{children}</main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
