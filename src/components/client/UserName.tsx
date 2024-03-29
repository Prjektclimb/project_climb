"use client";

import {  useContext} from "react";
import { AuthContext } from "~/useContext/authContext";
import { Button } from "~/@/components/ui/button";
// import { sessionType } from "~/types/authTypes";
import Link from "next/link";




export default function UserName() {

const auth = useContext(AuthContext)


  return (
    <>
      {auth?.user != null ? (
        <>
        <p>Hello</p>
        <Button variant='secondary' onClick={() => auth?.signOut()}>Sign out</Button>
        </>
      ) : (
        <Button variant='link'>
          <Link href="/auth/login">Log In</Link>
        </Button>
      )}
    </>
  );
}
