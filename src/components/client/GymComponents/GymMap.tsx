"use client";

import { useState,useMemo, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Tooltip,
  LayerGroup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { statesData } from "~/utils/data/us-states";
import { LatLngType, DEFAULT_LAYER_TYPE } from "~/types/leaftlet_types";
import GymMapInterface from "./GymMapInterface";
import { Layer, geoJSON, layerGroup } from "leaflet";


const DEFAULT_POSITION = { lat: 37.8, lng: -96 };
const DEFAULT_ZOOM_LEVEL = 3.3;



const DEFAULT_LAYER_STYLE = {  
fillColor: "white", 
weight: 2,
color: "black",
dashArray: "1",
fillOpacity: 1,}


export default function GymMap({}) {
  const [stateName, setStateName] = useState<string | null>();
  const [center, useCenter] = useState<LatLngType>(DEFAULT_POSITION);
  const mapRef = useRef<L.Map | null>(null)
 
  const onEachFeature = (
    feature: { properties: { name: any } },
    layer: { on: (arg0: { mouseover: () => void; click: () => void; mouseout: () => void }) => void;
    setStyle: (layer: DEFAULT_LAYER_TYPE) => void; }
) => {
  const stateNameRef = feature.properties.name;

    layer.on({
      mouseover: () => {
        setStateName(stateNameRef);
        layer.setStyle({
          fillColor: "red", 
          weight: 2,
          color: "black",
          dashArray: "3",
          fillOpacity: 0.7,
        });
      },
      click: () => { 
      
      },
      mouseout: () => { 
        layer.setStyle(DEFAULT_LAYER_STYLE);
     
      }
    });
  };

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={center}
        zoom={DEFAULT_ZOOM_LEVEL}
        style={{ height: "300px", width: "100%", border: "2px solid gray" }}
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
            //@ts-ignore
            onEachFeature={onEachFeature}
            style={DEFAULT_LAYER_STYLE}
          >
            <Tooltip offset={[0, 20]} opacity={1}>
              {stateName}
            </Tooltip>
          </GeoJSON>
        </LayerGroup>
      </MapContainer>
    ),
    [onEachFeature],
  );

  return (
    <div>
      <GymMapInterface map={mapRef.current}/> 
      {displayMap}
    </div>
  );
}
