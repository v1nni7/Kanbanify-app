"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { useState } from "react";

export default function Home() {
  const [toggle, setToggle] = useState(false)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={() => signIn()}>Sign In</button>

      <button onClick={() => setToggle(!toggle)}>Toggle</button>

      <div className={`absolute transition-all p-4 bg-red-200 ${toggle ? "left-1/2" : "left-0"}`}></div>
    </main>
  );
}
