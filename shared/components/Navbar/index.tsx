"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="flex items-center justify-between px-4 !text-white !font-semibold py-2 bg-[#10069d] border-b fixed w-full top-0 z-50">
      <div className="flex items-center space-x-4 ml-14">
        <img src="/nine-logo.png" alt="" className="!h-[45px] " />
        <ul className="flex space-x-5">
          <li>
            <a href="#" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </Button>
      </div>
    </nav>
  );
}
