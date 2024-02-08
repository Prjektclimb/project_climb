"use client";

import { states } from "~/utils/data/states";
import { ScrollArea } from "~/@/components/ui/scroll-area";
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
    <ScrollArea className="mb-8 space-x-2 rounded-md  border bg-sky-50 p-4  shadow-md">
      <div className="p-4 lg:h-48 md:full">
        {states.map((state) => (
          <>
            <div
              key={state}
              className={`list-none ${
                pathname === `/gyms/${state}` ? "text-blue-500 underline" : ""
              }`}
            >
              <Link href={`/gyms/${state}`}>{formatState(state)}</Link>
            </div>
          </>
        ))}
      </div>
    </ScrollArea>
  );
}
