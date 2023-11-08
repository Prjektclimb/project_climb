
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs"; 
import {cookies} from "next/headers"
import Link from "next/link";
import UserName from "~/components/client/UserName";

export const revalidate = 0



export default async function Header() {
  
	// const supabase = createServerComponentClient({ cookies });
	// const {
	//   data: { session },
	// } = await supabase.auth.getSession();





  return (
    <header className="flex flex-row justify-between p-2 px-10">
      <p className="font-bold">LOGO</p>
      <UserName  />
      <nav className="flex flex-row">
        <ul className="flex flex-row">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};


