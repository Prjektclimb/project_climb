"use client";

import { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { statesData, StatesDataInterface } from "~/utils/data/states";



interface Center {
  lat: number;
  lng: number;
}





export default function GymMap() {

  const apiKey = "lUmoOojik4381Shv1ScA"
const url = `https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?${apiKey}`


  const [center, useCenter] = useState<Center>({lat: 40.63463151377654, lng: -97.89969605983609 });
  const ZOOM_LEVEL = 9
  const mapRef = useRef()
const position = [51.505, -0.09]

return (
<MapContainer
      center={center}
      zoom={5}
      style={{ width: '50%', height: '350px' }}
    >
      <TileLayer
        url={url.toString()} 
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      {
        statesData.features.map((state) => {
          const coordinates = state.geometry.coordinates[0]?.map((item) => [item[1], item[0]]);

          return (<Polygon
            pathOptions={{
              fillColor: '#FD8D3C',
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: '3', /// double check
              color: 'black'
            }}
            positions={coordinates}
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  dashArray: "",
                  fillColor: "#BD0026",
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1,
                  color: "white",
                })
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 2,
                  dashArray: "3",
                  color: 'white',
                  fillColor: '#FD8D3C'
                });
              },
              click: (e) => {

              }
            }}
          />)
        })
      }
    </MapContainer>
  );
}

