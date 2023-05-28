"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { IoMdSettings, IoMdNotifications } from "react-icons/io";

import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();

  if (!session) return <></>;

  const { user } = session;

  return (
    <nav className="flex items-center justify-end gap-4 px-8 py-2">
      <div className="relative flex items-center">
        <button className="group text-2xl text-neutral-200 hover:text-neutral-200/60">
          <IoMdNotifications className="group-hover:animate-wiggle" />
        </button>
      </div>

      <button className="group text-2xl text-neutral-200 hover:text-neutral-200/60">
        <IoMdSettings className="group-hover:animate-[spin_2s_linear]" />
      </button>

      {user.profilePicture && (
        <Image
          width={64}
          height={64}
          src={user.profilePicture}
          alt=""
          className="h-12 w-12 rounded-full object-cover"
        />
      )}
    </nav>
  );
}
