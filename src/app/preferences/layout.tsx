import PreferencesNav from "~/components/client/preferencesNav";

export default function DashboardLayout({
	children, 
  }: {
	children: React.ReactNode
  }) {
	return (
		<div className="flex">
		  <aside className="flex-none h-full p-5 border-r-2 border-black fixed overflow-auto z-10">
			<p className="text-3xl">Edit Your Preference</p>
			<PreferencesNav /> 
		  </aside>
		  <div className="flex-grow flex items-center justify-center">
			{children}
		  </div>
		</div>
	  );
	  
  }