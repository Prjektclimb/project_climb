"use client";

import { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';


const key ="lUmoOojik4381Shv1ScA"

interface Center {
  lat: number;
  lng: number;
}





export default function GymMap() {

  const [center, useCenter] = useState<Center>({lat: 13.084622, lng: 80.248357 });
  const ZOOM_LEVEL = 9
  const mapRef = useRef()
const position = [51.505, -0.09]

return (
  <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} style={{height: 400, width: "50%"}}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
  );
}

