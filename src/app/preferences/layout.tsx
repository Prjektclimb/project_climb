import PreferencesNav from "~/components/client/preferencesNav";


export default function DashboardLayout({
	children, 
  }: {
	children: React.ReactNode
  }) {
	return (
		<div className="flex">
		  <aside className="flex-none h-full border-r-2 border-black fixed overflow-visible">
			<p className="text-3xl pb-24">Edit Your Preference</p>
			<PreferencesNav /> 
		  </aside>
		  <div className="flex-grow flex items-center justify-center">
			{children}
		  </div>
		</div>
	  );
	  
  }