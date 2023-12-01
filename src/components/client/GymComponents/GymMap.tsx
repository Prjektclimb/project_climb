"use client";

import { useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Tooltip, LayerGroup, useMapEvents, Marker, Popup} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { statesData } from "~/utils/data/us-states";





interface LatLngType { 
  lat: number,
  lng: number
}


function LocationMarker() {
  const [position, setPosition] = useState<LatLngType>({ lat: 0, lng: 0 })
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}



export default function GymMap() {

  const [stateName, setStateName] = useState<string | null>();
  const [map, setMap] = useState(null);

const DEFAULT_POSITION  = {lat: 37.8, lng: -96}
const [center, useCenter] = useState<LatLngType>(DEFAULT_POSITION);
const ZOOM_LEVEL = 3.3




const onEachFeature = (feature, layer) => {
 
  const stateNameRef = feature.properties.name 


  layer.on({
    mouseover: () => {
     setStateName(stateNameRef)
    },
   
  });



};

return (
  <MapContainer
  center={center}
  zoom={ZOOM_LEVEL}
  style={{ height: '300px', width: '50%' }}
>
  <TileLayer
    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    maxZoom={19}
    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  />
  <LayerGroup> 
  <GeoJSON data={statesData} onEachFeature={onEachFeature} style={{color:'black', fillColor: 'gray', weight: 1}}>
  <Tooltip offset={[0,20]} opacity={1}>{stateName}</Tooltip>
  </GeoJSON>
  </LayerGroup>
  <LocationMarker />
</MapContainer>
  );
}

