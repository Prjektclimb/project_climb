"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";
import { fetchGymsByColumn } from "~/app/api/supabase";
import { GymTypeArray } from "~/types/supabasetypes";
import { useParams } from "next/navigation";
import GymsInformation from "./GymsInformation";
import GymInfoPlaceHolder from "./GymInfoPlaceHolder";
import {   Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle, } from "~/@/components/ui/card";
  import { Separator } from "@radix-ui/react-dropdown-menu";
  


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

        <div className="flex flex-col lg:flex-row shadow-md">
           <Card>
             <CardHeader >{formatSlug(params?.slug)}</CardHeader>
             <CardDescription className="text-xs justify-center flex">Click on a Gym to see more information</CardDescription>
             <Separator className="my-4"/> 
             <CardContent>
                <ScrollArea>
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
                </ScrollArea>
             </CardContent>
           </Card>
    {selectGym ? (
      <GymsInformation GYM_NAME={selectGym} />
      ) : (
    null
        )}
        </div>
          );
        }
        // Remove Gym state with Gym's information. If no gym is selected. There should not be a place holder 