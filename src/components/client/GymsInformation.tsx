'use client'

import { FetchGymsInfoByName } from "~/app/api/supabase";
import { useEffect, useState } from "react";
import { GymInfoOrUndefined } from "~/types/supabasetypes";



export default function GymsInformation({GYM_NAME}: {GYM_NAME: string }) {

const [GymInfo, SetGymInfo] = useState<GymInfoOrUndefined>()

useEffect(() => { 
	FetchGymsInfoByName(GYM_NAME).then((info) => { 
		SetGymInfo(info)
	})

}, [GYM_NAME])


  return (
	<div className="flex flex-col">
	<p>info {GymInfo?.gym}</p>
	<p>{GymInfo?.phone_number}</p>
	</div>
  )
}
