"use client";

import "./globals.css";
import {
  Roboto_Flex as Roboto,
  Lexend_Deca as LexendDeca,
} from "next/font/google";
import { SessionProvider } from "next-auth/react";
import BoardContextProvider from "@/context/BoardContext";

const lexendDeca = LexendDeca({
  subsets: ["latin"],
  style: "normal",
  variable: "--font-lexend-deca",
});

const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto" });

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body className={`bg-neutral-900 ${roboto.variable} ${lexendDeca.variable} font-sans`}>
        <SessionProvider>
          <BoardContextProvider>
            <section className="w-5/6 mx-auto flex h-screen">
              <div className="my-8 w-full bg-neutral-800 rounded-lg shadow overflow-hidden">
                {children}
              </div>
            </section>
          </BoardContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
