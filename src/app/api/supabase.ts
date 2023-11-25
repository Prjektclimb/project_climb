import { supabaseclient } from "supabaseClient";
import { GymTypeArray } from "~/types/supabasetypes";



export async function fetchGymsByColumn(columnName: string, columnValue: string): Promise<GymTypeArray> {
	try {
	  const { data, error } = await supabaseclient
		.from("Gym")
		.select()
		.eq(columnName, columnValue);
  
	  if (error) {
		throw error;
	  }
  
	  return data;
	} catch (error) {
	  console.error("Error fetching state gym data:", error);
	  throw error
	}
  }
  