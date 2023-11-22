'use client'

import { states } from "~/utils/data/states"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"

export default function StateList() {
	
	const url = window.location.origin
	
	
  return (
	<div>
		<ScrollArea className="h-100% w-[350px] rounded-md border p-4 pb-24" >
			{states.map((state) => <li><Link href={`${url}/gyms/${state}`} key={state}>{state}</Link>
			</li>)}
		</ScrollArea> 
	</div>
  )
}
