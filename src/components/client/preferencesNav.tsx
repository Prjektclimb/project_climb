"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PreferencesNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col">
      <Link
        href="/preferences/"
        className={pathname === "/preferences" ? "underline" : ""}
      >
        Profile Information
      </Link>
      <Link
        href="/preferences/resetpassword"
        className={pathname === "/preferences/resetpassword" ? "underline" : ""}
      >
        Reset Password
      </Link>
    </div>
  );
}
