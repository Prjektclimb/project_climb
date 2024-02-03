/// FETCH Gym //////////////
export interface GymType {
  gym?: string;
  email?: string;
  address?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  id?: number;
  website?: string;
  state?: string;
  phone_number?: string;
  street_address?: string;
  suite?: string;
  zip_code?: string;
  city?: string;
}

export interface GymTypeArray extends Array<GymType | null | undefined> {}

export interface GymsByStateProps {
  data: () => Promise<GymTypeArray>;
}
///////////////////////////////

////// FETCH GYM INFO  /////////
export interface GymInfo {
  gym?: string;
  id?: number;
  phone_number?: string;
  website?: string;
  state?: string;
  street_address?: string;
  city?: string;
  zip_code?: string;
}

export type GymInfoOrUndefined = GymInfo | undefined;

////////////////////////////////////////

///////FEtch all Gym Info ////////////////////
export interface AllGymInfoFetch {
  id?: number;
  gym?: string;
  state?: string;
}

export type AllGymInfoFetchOrUndefine = AllGymInfoFetch | undefined;

////////////////////////////////////////////
