'use client'



import { FetchGymsInfoByName } from "~/app/api/supabase";
import { useEffect, useState } from "react";
import { GymInfoOrUndefined } from "~/types/supabasetypes";
import {Card,
	CardContent,
	CardHeader,
	CardTitle, } from "~/@/components/ui/card";



export default function GymsInformation({GYM_NAME}: {GYM_NAME: string }) {

	
	const [GymInfo, SetGymInfo] = useState<GymInfoOrUndefined>()
	
	const address = `${GymInfo?.street_address}, ${GymInfo?.city}, ${GymInfo?.state} ${GymInfo?.zip_code}`
	const redirectWebsite = `https://${GymInfo?.website}`
	


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
		{GymInfo?.website ? <p>Website:
		<a href={redirectWebsite} rel="noopener noreferrer" target={"_blank"} className="hover:text-blue-500">
			 {GymInfo?.website}
			</a> 
		</p>
		: null } 
		{GymInfo?.street_address ? <p>Address: {address}</p> : null } 
	</CardContent>
</Card>
	

  )
}
