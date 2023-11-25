"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";
import { fetchGymsByColumn } from "~/app/api/supabase";
import { GymTypeArray} from "~/types/supabasetypes";

export function formatSlug(slug: string): string {
  const words = slug.split("-");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  );
  const formattedString = capitalizedWords.join(" ");

  return formattedString;
}


/// Need to Get DATA DEFINED 
export default function GymsByState(data: string) {
  const [GymData, setGymData] = useState<GymTypeArray>([]);

  useEffect(() => {
    fetchGymsByColumn("state", formatSlug(data)).then((e) => {
      setGymData(e);
    });
  }, []);



  return (
    <div>
      <ScrollArea></ScrollArea>
    </div>
  );
}
