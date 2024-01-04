'use client'

import Link from "next/link";
import UserName from "~/components/client/UserName";
import { DropdownMenu, DropdownMenuTrigger,DropdownMenuContent,DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";



function DropDownMenuSmall(){
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="btn btn-primary">Open</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Navigation</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <li>
              <Link href="/">Home</Link>
            </li>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <li>
              <Link href="/about">About</Link>
            </li>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <li>
              <Link href="/contact">Events</Link>
            </li>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <li>
              <Link href="/preferences">Settings</Link>
            </li>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Header() {

  const [isNarrowScreen, setIsNarrowScreen] = useState(false);
  
  useEffect(() => {
    // set initial value
    const mediaWatcher = window.matchMedia('(max-width: 500px)');
    setIsNarrowScreen(mediaWatcher.matches);

    // watch for updates
    function updateIsNarrowScreen(e) {
      setIsNarrowScreen(e.matches);
    }
    mediaWatcher.addEventListener('change', updateIsNarrowScreen);

    // clean up after ourselves
    return function cleanup() {
      mediaWatcher.removeEventListener('change', updateIsNarrowScreen);
    };
  }, []);

  return (
    <header className="z-10 flex w-screen flex-row  justify-between px-10">
      <p className="font-bold">LOGO</p>
      <UserName />
      <nav className="flex flex-row">
        {isNarrowScreen ? <DropDownMenuSmall /> : (
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
              <Link href="/preferences">Settings</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
