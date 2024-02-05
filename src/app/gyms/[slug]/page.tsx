

import GymsByState from "~/components/client/GymComponents/GymsByState";


function formatSlug(slug: string): string {
    const words = slug.split("-");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1),
    );
    const formattedString = capitalizedWords.join(" ");
    return formattedString;
  }  


export default function statePage({ params }: { params: { slug: string } }) {



  return (
    <div className="flex flex-col justify-evenly">
      <p className="text-center text-xl ">{formatSlug(params.slug)}</p>
      <div className="flex">
		<GymsByState/>  
      </div>
    </div>
  );
}
