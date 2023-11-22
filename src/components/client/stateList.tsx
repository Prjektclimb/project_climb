'use client'

import { states } from "~/utils/data/states"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"

export default function StateList() {
		
  return (
	<div>
		<ScrollArea className="h-100% w-[350px] rounded-md border p-4 pb-24" >
			{states.map((state) => <li key={state}><Link href={`/gyms/${state}`}>{state}</Link>
			</li>)}
		</ScrollArea> 
	</div>
  )
}
