"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs"
import Link from "next/link";

export default function UserName({ session }) {
  return (
    <>
      {session ? (
        <p>Hellop</p>
      ) : (
        <Button>
          <Link href="/auth/login">Signin</Link>
        </Button>
      )}
    </>
  );
}
