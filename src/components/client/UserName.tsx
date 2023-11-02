"use client";

import { useState, useEffect, useContext} from "react";
import { AuthContext } from "~/useContext/authContext";
import { Button } from "@/components/ui/button";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import Link from "next/link";


export default function UserName({ session, user }) {


const auth = useContext(AuthContext)



  return (
    <>
      {session ? (
        <>
        <p>Hello</p>
        <Button onClick={() => auth.signOut()}>Sign out</Button>
        </>
      ) : (
        <Button>
          <Link href="/auth/login">Signin</Link>
        </Button>
      )}
    </>
  );
}
