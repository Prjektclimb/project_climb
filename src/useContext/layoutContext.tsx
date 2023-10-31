

import { AppProps, type AppType } from "next/app";
import { SupabaseClient, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { AuthProvider } from "~/useContext/authContext";
import "~/styles/globals.css";
import Header from "~/components/server/Header";





export function LayoutProvider({
  children,
}: {
  children: React.ReactNode
}) {

  
  return (

      
      <AuthProvider>
        <Header /> 
   {children}
      </AuthProvider>
    
 
  )
}