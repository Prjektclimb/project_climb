"use client";

import { states } from "~/utils/data/states";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

function formatState(state: string): string {
  const words = state.split("-");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  );
  const formattedString = capitalizedWords.join(" ");
  return formattedString;
}

export default function StateList() {
  const pathname = usePathname();
  return (
    <div className="drawer lg:drawer-open"> 
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <label htmlFor="my-drawer" className="sticky rotate-90 origin-left bg-info px-4  lg:hidden text-neutral font-bold text-lg text-center cursor-pointer">
  View State List
</label>
      <div className="drawer-content ">
  </div> 
  <div className="drawer-side  z-50">
  <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay w-full"></label> 
   <ScrollArea className="h-100%  rounded-md border mb-8  pb-24 bg-sky-50 p-4 space-x-4 shadow-md">
  {states.map((state) => (
    <li
      key={state}
      className={`list-none ${pathname === `/gyms/${state}` ? "underline text-blue-500" : ""}`}
    >
      <Link href={`/gyms/${state}`}>{formatState(state)}</Link>
    </li>
  ))}
</ScrollArea>
    </div>
    </div>
  );
}
