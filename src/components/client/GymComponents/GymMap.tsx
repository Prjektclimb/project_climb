"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  GeoJSON,
  LayerGroup,
  MapContainer,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { statesData } from "~/utils/data/us-states";
import { DEFAULT_LAYER_TYPE, LatLngType } from "~/types/leaftlet_types";
import GymMapInterface from "./GymMapInterface";
import { useRouter } from "next/navigation";
import { formatStateToLowerCase } from "~/functions&hooks/general_functions";
import { stateCoordinates } from "~/utils/data/states_latlng";
import { PathOptions } from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useLocationMarker } from "~/functions&hooks/hooks/useLocationMarker";

// Leaflet-GEOSEARCH --------
const SearchField = () => {
  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: new OpenStreetMapProvider(),
    autoClose: true,
    noFoundMessage: "Sorry, that address could not be found.",
  });

  const map = useMap();
  //@ts-ignore
  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

  return null;
};

// --------------
const DEFAULT_POSITION = { lat: 37.8, lng: -96 };
const DEFAULT_ZOOM_LEVEL = 3.3;

const DEFAULT_LAYER_STYLE: PathOptions = {
  fillColor: "gray",
  weight: 2,
  color: "black",
  dashArray: "1",
  fillOpacity: 0.1,
};

export default function GymMap({}) {
  const [stateName, setStateName] = useState<string | null>();
  const [center, useCenter] = useState<LatLngType>(DEFAULT_POSITION);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.GeoJSON | null>(null);

  //ROUTER
  const router = useRouter();

  const onEachFeature = (
    feature: { properties: { name: string }; geometry: { coordinates: any } },
    layer: {
      on: (arg0: {
        mouseover: () => void;
        click: () => void;
        mouseout: () => void;
      }) => void;
      setStyle: (layer: PathOptions) => void;
    },
  ) => {
    const stateNameRef = feature.properties.name;

    const formatStateName = formatStateToLowerCase(stateNameRef); // For Router SLUG

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
        router.push(`http://localhost:3000/gyms/${formatStateName}`);

        if (mapRef.current) {
          const stateCoordinatesMap = stateCoordinates[formatStateName];

          if (stateCoordinatesMap) {
            mapRef.current?.flyTo(
              [stateCoordinatesMap.lat, stateCoordinatesMap.lng],
              5,
            );
          } else {
            console.error(
              `Coordinates not found for state: ${formatStateName}`,
            );
          }
        }
      },
      mouseout: () => {
        layer.setStyle(DEFAULT_LAYER_STYLE);
      },
    });
  };

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={center}
        zoom={DEFAULT_ZOOM_LEVEL}
        style={{
          height: "100%",
          minHeight: "500px",
          width: "100%",
          margin: 5,
          border: "2px solid gray",
          zIndex: 0,
        }}
        ref={mapRef}
      >
        <SearchField />
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <LayerGroup ref={layerRef}>
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
      {displayMap}
      <GymMapInterface
        map={mapRef.current as L.Map}
        geo={layerRef.current as L.GeoJSON}
      />
    </div>
  );
}
