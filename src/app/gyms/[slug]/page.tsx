

export default function statePage({params}: {params: {slug:string}}) { 


	return (
	<>
	<p>state</p>
	<p>is{params.slug}</p>
	</>
	) 
}