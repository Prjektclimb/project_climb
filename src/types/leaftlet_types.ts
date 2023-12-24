export interface LatLngType {
	lat: number;
	lng: number;
  }


  /// NOT BEING USED -- replaced with PathOptions types in leaflet
  export interface DEFAULT_LAYER_TYPE {  
	fillColor?: string, 
	weight?: number,
	color?: string,
	dashArray?: string,
	fillOpacity?: number,
	}

	// ----------


	export interface GeoLayerOptionProps {
		map: L.Map | null;
		geo: L.GeoJSON | null;
	  }