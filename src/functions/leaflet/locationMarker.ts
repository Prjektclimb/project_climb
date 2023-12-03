
import { Popup, Marker, useMapEvents,  } from "react-leaflet";
import { useState } from "react";
import { LatLngType, } from "~/types/leaftlet_types";

export const useLocationMarker = () => {
	const [position, setPosition] = useState<LatLngType | null>({ lat: 0, lng: 0 });
	const map = useMapEvents({
	  click() {
		map.locate();
	  },
	  locationfound(e) {
		setPosition(e.latlng);
		map.flyTo(e.latlng, map.getZoom());
	  },
	});

	return position
  }


  // Creating a hook that uses map and 