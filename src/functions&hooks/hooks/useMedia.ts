'use client'

import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
 
	const getMatches = (query: string): boolean => { 
		if(typeof window !== 'undefined') {
			return window.matchMedia(query).matches}
		else { 
			return false
		}

		
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