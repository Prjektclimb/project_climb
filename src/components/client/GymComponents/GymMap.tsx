"use client";

import { useCallback, useState, useEffect, useMemo, FC, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Tooltip,
  LayerGroup,
  useMapEvents,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { statesData } from "~/utils/data/us-states";
import { LatLngType } from "~/types/leaftlet_types";
import { useLocationMarker } from "~/functions/leaflet/locationMarker";
import GymMapInterface from "./GymMapInterface";


const DEFAULT_POSITION = { lat: 37.8, lng: -96 };
const DEFAULT_ZOOM_LEVEL = 3.3;


// Find User's current location 
const LocationMarker = () => {
  const myLocation = useLocationMarker();

  return myLocation === null ? null : (
    <Marker position={myLocation}>
      <Popup>You are here</Popup>
    </Marker>
  );
};



// 35.860119, -86.660156. Tennessee 
// const StateZoom = ({ map}: {map: L.Map | null}) => {
//   const [position, setPosition] = useState(() => map?.getCenter());
//   const onClick = useCallback(() => {
//     map?.setView(DEFAULT_POSITION, DEFAULT_ZOOM_LEVEL)
//   }, [map]);

//   return( <button className="bg-green" onClick={onClick}>Reset View</button>) 
// };



export default function GymMap({}) {
  const [stateName, setStateName] = useState<string | null>();
  const [center, useCenter] = useState<LatLngType>(DEFAULT_POSITION);
  const mapRef = useRef<L.Map | null>(null)
 
  const onEachFeature = (
    feature: { properties: { name: any } },
    layer: { on: (arg0: { mouseover: () => void }) => void },
  ) => {
    const stateNameRef = feature.properties.name;

    layer.on({
      mouseover: () => {
        setStateName(stateNameRef);
      },
    });
  };

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={center}
        zoom={DEFAULT_ZOOM_LEVEL}
        style={{ height: "300px", width: "100%" }}
        ref={mapRef}
        
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <LayerGroup>
          <GeoJSON
            //@ts-ignore
            data={statesData}
            onEachFeature={onEachFeature}
            style={{ color: "black", fillColor: "gray", weight: 1 }}
          >
            <Tooltip offset={[0, 20]} opacity={1}>
              {stateName}
            </Tooltip>
          </GeoJSON>
        </LayerGroup>
        <LocationMarker />
      </MapContainer>
    ),
    [onEachFeature],
  );

  return (
    <div>
      <GymMapInterface map={mapRef.current}/> 
      {/* <StateZoom map={mapRef.current} />  */}
      {displayMap}
    </div>
  );
}
