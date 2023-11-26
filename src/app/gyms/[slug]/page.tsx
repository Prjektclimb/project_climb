

import { supabaseclient } from "supabaseClient";
import { fetchGymsByColumn } from "~/app/api/supabase";
import GymsByState from "~/components/client/GymComponents/GymsByState";
import GymsInformation from "~/components/client/GymComponents/GymsInformation";



export function formatSlug(slug: string): string {
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
      <p className="text-center">{formatSlug(params.slug)}</p>
      <div className="flex space-x-40">
		<GymsByState/>  
      </div>
    </div>
  );
}
