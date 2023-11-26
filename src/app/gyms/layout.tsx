import StateList from "~/components/client/GymComponents/stateList"
import GymMap from "~/components/client/GymComponents/GymMap";




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
		  
		  <div className="flex-grow flex justify-center mt-24">
			{children}
		  </div>
		  <div className=" flex justify-center mb-24">
		<GymMap /> 
		</div>
		</div>
	  );
	  
  }