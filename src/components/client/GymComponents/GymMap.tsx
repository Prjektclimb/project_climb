"use client";

import { useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, Polygon } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { statesData } from "~/utils/data/us-states";





interface centertype { 
  lat: number,
  lng: number
}




export default function GymMap() {

  

const DEFAULT_POSITION  = {lat: 37.8, lng: -96}
const [center, useCenter] = useState<centertype>(DEFAULT_POSITION);
const ZOOM_LEVEL = 4



return (
  <MapContainer
  center={center}
  zoom={ZOOM_LEVEL}
  style={{ height: '500px', width: '50%' }}
>
  <TileLayer
    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    maxZoom={19}
    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  />

  <GeoJSON data={statesData} />
</MapContainer>
  );
}

