"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";
import { FetchAllGyms } from "~/app/api/supabase";
import {
  AllGymInfoFetch,
  AllGymInfoFetchOrUndefine,
  GymInfoOrUndefined,
} from "~/types/supabasetypes";
import Link from "next/link";
import { getStateFullName } from "~/functions&hooks/general_functions";

export default async function GymsCompleteList() {
  const [gyms, setGyms] = useState<AllGymInfoFetchOrUndefine[]>([]);
  

  useEffect(() => {
    const fetchGyms = async () => {
      const info = await FetchAllGyms();
      if (info != undefined) {
        setGyms(info);
      }
    };
    fetchGyms();
  }, []);

  /// Need to add loading block
  return (
    <>
      <ScrollArea className="mb-8 space-x-4 rounded-md  border bg-sky-50 p-4  shadow-md">
        <div className="md:full overflow-scroll p-4 lg:h-48">
          {gyms ? (
            <>
              <ul>
                {gyms.map((gym, index) => (
                  <li key={index} className="flex flex-row justify-between">
                    <Link href={`/gyms/${getStateFullName(gym?.state)}`}>{gym?.gym}</Link>
                    <p className="font-extralight">...{gym?.state}</p>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>No Gym info</p>
          )}
        </div>
      </ScrollArea>
    </>
  );
}
