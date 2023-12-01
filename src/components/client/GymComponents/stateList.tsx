"use client";

import { states } from "~/utils/data/states";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
    <div>
      <ScrollArea className="h-100% w-[350px] rounded-md border mb-48 pb-24 bg-sky-50 p-4 space-x-4 shadow-md">
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
  );
}
