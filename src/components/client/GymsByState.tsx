"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useContext, useEffect, useState } from "react";
import { fetchGymsByColumn } from "~/app/api/supabase";
import { GymTypeArray} from "~/types/supabasetypes";
import { useParams } from "next/navigation";
import gymPage from "~/app/gyms/page";

export function formatSlug(slug: string | string[] | undefined ): string {
	if (slug === undefined || slug === null) {
	  throw new Error("Slug cannot be undefined or null");
	}
  
	const words = (slug as string).split("-");
	const capitalizedWords = words.map(
	  (word) => word.charAt(0).toUpperCase() + word.slice(1),
	);
	const formattedString = capitalizedWords.join(" ");
  
	return formattedString;
  }







export default function GymsByState() {
  const [GymData, setGymData] = useState<GymTypeArray>([]);
  const params = useParams();

  useEffect(() => {
	const formattedSlug = formatSlug(params?.slug)
fetchGymsByColumn("state", formattedSlug).then((slug) => {
	setGymData(slug);
  });
  }, []);

  console.log(GymData)


  return (
    <div>
      <ScrollArea className="h-[100px] w-[350px] rounded-md border p-4 pb-24">
	  <ul>
        {Object.values(GymData).map((gym) => (
          <li key={gym?.id}>
            {gym?.gym}
          </li>
        ))}
      </ul>
	  </ScrollArea>
    </div>
  );
}
