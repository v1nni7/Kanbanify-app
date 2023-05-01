"use client";

import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { BiCaretDown } from "react-icons/bi";
import useToggleClickOutside from "@/hooks/useToggleClickOutside";

type WorkspaceLayoutProps = {
  children: React.ReactNode;
};

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  const [dropdownOpen, toggle, elementRef, buttonRef] =
    useToggleClickOutside(false);

  const { user } = useContext(AuthContext);

  return (
    <>
      <nav className="flex items-center justify-between bg-slate-700 p-4">
        <div className="flex items-center">
          <h1 className="text-3xl text-blue-500 font-bold bg-blue-200 p-2 rounded-md shadow shadow-blue-200 mr-6">
            React Kanban
          </h1>

          <ul className="flex items-center">
            <li className="mr-3">
              <Link
                href="/boards"
                className="block font-semibold py-2 px-4 rounded-md border-2 border-slate-700 text-slate-400 hover:text-slate-300 hover:border-slate-300 transition text-md"
              >
                Boards
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center relative">
          <button
            ref={buttonRef}
            onClick={() => toggle()}
            className="flex items-center"
          >
            <img
              className="w-10 h-10 object-cover rounded-md border-2 border-slate-400"
              src={user.profilePicture}
              alt=""
            />
            <BiCaretDown className="text-slate-200" />
          </button>
          <ul
            className={`${
              dropdownOpen ? "visible" : "hidden"
            } w-[160px] rounded-md shadow shadow-inner bg-slate-600 right-0 top-12 absolute overflow-hidden z-10`}
            ref={elementRef}
          >
            <li className="text-slate-200 hover:bg-slate-500 transition text-center p-2">
              <Link className="block " href="/profile">
                Profile
              </Link>
            </li>
            <li className="text-slate-200 hover:bg-red-400 transition text-center p-2">
              <Link className="block" href="/profile">
                Exit
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {children}
    </>
  );
}
