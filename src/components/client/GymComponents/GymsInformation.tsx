'use client'

import { FetchGymsInfoByName } from "~/app/api/supabase";
import { useEffect, useState } from "react";
import { GymInfoOrUndefined } from "~/types/supabasetypes";
import {Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle, } from "~/@/components/ui/card";


export default function GymsInformation({GYM_NAME}: {GYM_NAME: string }) {

const [GymInfo, SetGymInfo] = useState<GymInfoOrUndefined>()

useEffect(() => { 
	FetchGymsInfoByName(GYM_NAME).then((info) => { 
		SetGymInfo(info)
	})

}, [GYM_NAME])


  return (
<Card>
	<CardHeader>
		<CardTitle>{GymInfo?.gym}</CardTitle>
	</CardHeader>
	<CardContent>
		{GymInfo?.phone_number ? <p>Phone: {GymInfo?.phone_number}</p> : null } 
	</CardContent>
</Card>
	

  )
}
