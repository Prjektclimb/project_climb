import StateList from "~/components/client/stateList"

export default function GymsLayout({
	children, 
  }: {
	children: React.ReactNode
  }) {
	return (
		<div className="flex">
		  <aside className="flex-none h-full p-5 fixed overflow-auto z-10">
			<p className="text-3xl">Find a Gym</p>
			<StateList /> 
		  </aside>
		  <div className="flex-grow flex items-center justify-center">
			{children}
		  </div>
		</div>
	  );
	  
  }