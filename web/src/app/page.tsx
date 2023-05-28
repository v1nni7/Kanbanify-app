"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={() => signIn()}>Sign In</button>
    </main>
  );
}
