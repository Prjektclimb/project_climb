"use client";

import { useState, useEffect, useContext} from "react";
import { AuthContext } from "~/useContext/authContext";
import { Button } from "@/components/ui/button";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

export default function UserName({ session }) {

const auth = useContext(AuthContext)
const handleSubmit =async (e:any) => {
  e.preventDefault(); 
  await auth.signOut()
  await console.log('hi')

  
}


  return (
    <>
      {session ? (
        <>
        <p>Hello</p>
        <Button onClick={handleSubmit}>Sign out</Button>
        </>
      ) : (
        <Button>
          <Link href="/auth/login">Signin</Link>
        </Button>
      )}
    </>
  );
}
