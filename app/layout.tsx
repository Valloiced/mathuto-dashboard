import type { Metadata } from "next";
import getFonts, { fonts } from "./fonts";
import "../styles/globals.css";

import { AuthContextProvider } from "@/context/AuthContext";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "Mathuto Dashboard",
  description: "A gamified lms app to learn Mathematics as intuitevely as possible for everyone!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${getFonts(fonts)} font-sans scroll-smooth`}>
        <AuthContextProvider>
          <Layout>
            {children}
          </Layout>
        </AuthContextProvider>
      </body>
    </html>
  );
}
