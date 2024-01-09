'use client'

import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
 
	const getMatches = (query: string): boolean => { 
		 { return window.matchMedia(query).matches}
		

		
	}
	const [matches, setMatches] = useState<boolean>(getMatches(query))
	
	function updateScreen(e: any) { 
		setMatches(e.matches)
	}
	useEffect(() => { 



		const mediaWatcher = window.matchMedia(query); 
		setMatches(mediaWatcher.matches); 


		mediaWatcher.addEventListener('change', updateScreen)



	
	
}, [])

return matches


}