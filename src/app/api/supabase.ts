import { supabaseclient } from "supabaseClient";
import { GymTypeArray, GymInfoOrUndefined, AllGymInfoFetchOrUndefine } from "~/types/supabasetypes";


////////////////////

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
  
///////////////////////

export async function FetchGymsInfoByName(GymName: string): Promise<GymInfoOrUndefined> { 
try {
	const { data, error } = await supabaseclient
	.from("Gym")
	.select("gym, id, phone_number, website, state, street_address, city, zip_code" )
	.eq("gym", GymName);

  if (error) {
	throw error;
  }

  if (data && data.length > 0) {
	return data[0]; // Assuming you expect only one result based on the GymName
  } else {
	throw new Error(`No gym found with the name: ${GymName}`);
  }
} catch (error) {
	console.log("Error Fetching Gym Information", error)
	throw error
}

  }


  ////////////////////



  export async function FetchAllGyms() {

	try { 
		const {data, error} = await supabaseclient.from("Gym").select();

		if (error) { 
			throw Error
		}
		if (data.length > 0 && data) { 
			return data; 
		}
	}
	catch (error) { 
		console.log("Error Fetching information for all gyms", error)
	}
	
  }