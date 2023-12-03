import StateList from "~/components/client/GymComponents/stateList"
import dynamic from "next/dynamic";


const DynamicMap = dynamic(() => import("~/components/client/GymComponents/GymMapInterface"), { 
	ssr: false
})

export default function GymsLayout({
	children, 
  }: {
	children: React.ReactNode
  }) {
	return (
		<div className="flex flex-col h-screen justify-evenly">
		  <aside className="flex-none h-full p-5 fixed overflow-auto z-10">
			<p className="text-3xl">Find a Gym</p>
			<StateList /> 
		  </aside>
		  
		  <div className="flex-grow flex  justify-center items-center ">
			{children}
		  </div>
		  <div className=" flex justify-center mb-24">
		<DynamicMap /> 
		</div>
		</div>
	  );
	  
  }