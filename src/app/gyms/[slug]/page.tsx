

export default function statePage({params}: {params: {slug:string}}) { 

	function formatSlug(slug: string): string {
		const words = slug.split('-');
		const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
		const formattedString = capitalizedWords.join(' ');
	  
		return formattedString;
	  }

	return (
	<>
	<p>{formatSlug(params.slug)}</p>
	</>
	) 
}