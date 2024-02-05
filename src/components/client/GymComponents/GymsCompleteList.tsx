"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";
import { FetchAllGyms } from "~/app/api/supabase";
import {
  AllGymInfoFetch,
  AllGymInfoFetchOrUndefine,
  GymInfoOrUndefined,
} from "~/types/supabasetypes";

export default async function GymsCompleteList() {
  const [gyms, setGyms] = useState<AllGymInfoFetchOrUndefine[]>([]);

  useEffect(() => {
    const fetchGyms = async () => {
      const info = await FetchAllGyms();
      if (info != undefined) {
        setGyms(info);
      }
    };
    fetchGyms()
  }, []);

  /// Need to add loading block 
  return (
    <>
    <ScrollArea className="h-1/2  mb-8 space-x-4 rounded-md  border bg-sky-50 p-4 pb-24 shadow-md">
      <div>
    
      {gyms ? (
        <ul>
          {gyms.map((gym, index) => (
            <li key={index} className="flex flex-row justify-between">
             <p>{gym?.gym}</p>
             <p className="font-extralight">...{gym?.state}</p>
           </li>
          ))}
        </ul>
      ) 
      :
      (
        <p>No Gym info</p>
        )}
        </div>
        </ScrollArea>
    </>
  );
}
