"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { BiCaretDown } from "react-icons/bi";
import useToggleClickOutside from "@/hooks/useToggleClickOutside";
import { signOut } from "next-auth/react";

type WorkspaceLayoutProps = {
  children: React.ReactNode;
};

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  const { data: session } = useSession();

  const [dropdownOpen, toggle, elementRef, buttonRef] =
    useToggleClickOutside(false);

  return (
    <>
      <nav className="flex items-center justify-between bg-slate-700 p-4">
        <div className="flex items-center">
          <h1 className="mr-6 rounded-md bg-blue-200 p-2 text-3xl font-bold text-blue-500 shadow shadow-blue-200">
            React Kanban
          </h1>

          <ul className="flex items-center">
            <li className="mr-3">
              <Link
                href="/boards"
                className="text-md block rounded-md border-2 border-slate-700 px-4 py-2 font-semibold text-slate-400 transition hover:border-slate-300 hover:text-slate-300"
              >
                Boards
              </Link>
            </li>
          </ul>
        </div>
        <div className="relative flex items-center">
          <button
            ref={buttonRef}
            onClick={() => toggle()}
            className="flex items-center"
          >
            <img
              className="h-10 w-10 rounded-md border-2 border-slate-400 object-cover"
              src={session?.user.profilePicture}
              alt=""
            />
            <BiCaretDown className="text-slate-200" />
          </button>
          <ul
            className={`${
              dropdownOpen ? "visible" : "hidden"
            } absolute right-0 top-12 z-10 w-[160px] overflow-hidden rounded-md bg-slate-600 shadow shadow-inner`}
            ref={elementRef}
          >
            <li className="p-2 text-center text-slate-200 transition hover:bg-slate-500">
              <Link className="block " href="/profile">
                Profile
              </Link>
            </li>
            <li
              onClick={() => signOut()}
              className="p-2 text-center text-slate-200 transition hover:cursor-pointer hover:bg-red-400"
            >
              Exit
            </li>
          </ul>
        </div>
      </nav>
      {children}
    </>
  );
}
