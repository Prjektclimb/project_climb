'use client'

import Link from "next/link";
import UserName from "~/components/client/UserName";
import { DropdownMenu, DropdownMenuTrigger,DropdownMenuContent,DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "~/functions&hooks/hooks/useMedia";



function DropDownMenuSmall(){
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"outline"}>Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
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

  const mediaScreen = useMediaQuery('(max-width: 768px')

  // const [isNarrowScreen, setIsNarrowScreen] = useState<boolean>(false);
  
  // useEffect(() => {
  //   // set initial value
  //   const mediaWatcher = window.matchMedia('(max-width: 768px)');
  //   setIsNarrowScreen(mediaWatcher.matches);

  //   // watch for updates
  //   function updateIsNarrowScreen(e: any) {
  //     setIsNarrowScreen(e.matches);
  //   }
  //   mediaWatcher.addEventListener('change', updateIsNarrowScreen);

  //   // clean up after ourselves
  //   return function cleanup() {
  //     mediaWatcher.removeEventListener('change', updateIsNarrowScreen);
  //   };
  // }, []);

  return (
    <header className="z-10 flex w-screen justify-around">
      <p className="font-bold">LOGO</p>
      <UserName />
      <nav className="flex flex-row justify-around">
        {mediaScreen ? <DropDownMenuSmall /> : (
          <ul className="flex flex-row justify-around ">
            <li className="px-2">
              <Link href="/">Home</Link>
            </li>
            <li className="px-2">
              <Link href="/about">About</Link>
            </li>
            <li className="px-2">
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
