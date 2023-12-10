
import {  useEffect } from "react";
import { marker, popup } from "leaflet";




export const useLocationMarker = ({map}: {map: L.Map | null}) => {
useEffect(() => {

			if (!("geolocation" in navigator)) { console.log('Gelocation Not Supported')}

		  map?.locate().on("locationfound", (e) => {
			const myLocation = e.latlng;
	
			// Create a popup
			const popUp = popup().setContent("You are Here");
	
			// Create a marker with the popup and add it to the map
			const myMarker = marker(myLocation).bindPopup(popUp).addTo(map);
	
			// Fly to the user's location
			map?.flyTo(myLocation, map.getZoom());
		  })
		  .on('locationerror', (e) => { 
			console.error('Error finding location:', e.message);
			// Handle location error if needed
		  });
		}, [map])

	};
	
