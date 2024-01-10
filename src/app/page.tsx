

import { Button } from "~/@/components/ui/button";
import { supabaseclient } from "supabaseClient";




export default async function Home() {




  return (
    <>
      <div>
        <p className="bg-red-500">Hi</p>
        <Button variant='secondary' className="bg-red">Click me</Button>
        </div>
    </>
  );
}

