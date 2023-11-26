'use client'

import { FetchGymsInfoByName } from "~/app/api/supabase";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { GymInfoOrUndefined } from "~/types/supabasetypes";



export default function GymsInformation() {
const params = useParams();

const [GymInfo, SetGymInfo] = useState<GymInfoOrUndefined>()

useEffect(() => { 
	FetchGymsInfoByName("First Avenue Rocks").then((info) => { 
		SetGymInfo(info)
	})

}, [])

console.log(GymInfo)

  return (
	<>
	<p>info {GymInfo?.gym}</p>
	<p>{GymInfo?.phone_number}</p>
	</>
  )
}
