import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import {cookies} from 'next/headers'; 


export default async function Session() { 
	const supabase = createServerComponentClient({ cookies});
	const {data: {session}} = await supabase.auth.getSession()
 
console.log('session', session)

return { 
	props: { 
		session: session
	}
}

}