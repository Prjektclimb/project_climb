

import Link from "next/link";
import UserName from "~/components/client/UserName";


export default async function Header() {

  return (
    <header className="flex flex-row justify-between p-2 px-10  z-10">
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
          <li>
            <Link href='/preferences'>Settings</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};


