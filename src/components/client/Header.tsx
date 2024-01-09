"use client";

import { useRouter } from "next/navigation";
import UserName from "~/components/client/UserName";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "~/functions&hooks/hooks/useMedia";

function DropDownMenuSmall() {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Button onClick={() => router.push("/")}>Home</Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button onClick={() => router.push("/gyms")}>Gyms</Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button onClick={() => router.push("/contact")}>contact</Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button onClick={() => router.push("/preference")}>
              Preference
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Header() {
  const mediaScreen = useMediaQuery("(max-width: 768px");
  const router = useRouter();

  return (
    <header className="z-10 flex w-screen justify-around">
      <p className="font-bold">LOGO</p>
      <UserName />
      <nav className="flex flex-row justify-around">
        {mediaScreen ? (
          <DropDownMenuSmall />
        ) : (
          <>
            <Button type="button" onClick={() => router.push("/")}>
              Home
            </Button>

            <Button type="button" onClick={() => router.push("/gyms")}>
              About
            </Button>

            <Button type="button" onClick={() => router.push("/contact")}>
              contact
            </Button>

            <Button type="button"  onClick={() => router.push("/preference")}>
              Preference
            </Button>
          </>
        )}
      </nav>
    </header>
  );
}
