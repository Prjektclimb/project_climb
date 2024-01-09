import { NextResponse } from "next/server"


export  function GET(request: Request) {

	/// Set up Cookies 

	  return NextResponse.json({message: "hello"})

} 