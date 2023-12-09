"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useContext, useEffect, useState } from "react";
import { fetchGymsByColumn } from "~/app/api/supabase";
import { GymTypeArray } from "~/types/supabasetypes";
import { useParams } from "next/navigation";
import GymsInformation from "./GymsInformation";
import GymInfoPlaceHolder from "./GymInfoPlaceHolder";

export function formatSlug(slug: string | string[] | undefined): string {
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
  const [selectGym, setSelectGym] = useState<string>();
  const params = useParams();

  const handleGymClick = (gymName: string | undefined) => {
    setSelectGym(gymName);
  };

  useEffect(() => {
    const formattedSlug = formatSlug(params?.slug);
    fetchGymsByColumn("state", formattedSlug).then((slug) => {
      setGymData(slug);
    });
  }, [selectGym]);

  return (
    <div className="flex space-x-4 bg-sky-50 p-4 shadow-md">
      <ScrollArea className="h-72 w-[350px] overflow-auto  rounded-md  p-4">
        <div>
          <ul>
            {Object.values(GymData).map((gym) => (
              <li
                key={gym?.id}
                className={
                  selectGym === gym?.gym ? "text-blue-500 underline" : ""
                }
                onClick={() => handleGymClick(gym?.gym)}
              >
                {gym?.gym}
              </li>
            ))}
          </ul>
        </div>
      </ScrollArea>
      {selectGym ? (
        <GymsInformation GYM_NAME={selectGym} />
      ) : (
        <GymInfoPlaceHolder />
      )}
    </div>
  );
}
