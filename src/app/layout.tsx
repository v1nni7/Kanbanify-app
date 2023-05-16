"use client";

import "./globals.css";
import { Lexend_Deca } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import BoardContextProvider from "@/context/BoardContext";
import { authOptions } from "./api/auth/[...nextauth]/route";

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  style: "normal",
  weight: "400",
});

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html className="dark" lang="en">
      <body className={`bg-slate-900 ${lexendDeca.className}`}>
        <SessionProvider>
          <BoardContextProvider>
            <section className="container mx-auto h-screen py-10">
              <div className="relative h-full animate-fade overflow-hidden rounded-lg bg-slate-800 shadow">
                {children}
              </div>
            </section>
          </BoardContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
