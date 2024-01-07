"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { states } from "~/utils/data/states";
import { useLocationMarker } from "~/functions&hooks/hooks/locationMarker";
import { stateCoordinates } from "~/utils/data/states_latlng";
import { Button } from "@/components/ui/button";
import { GeoLayerOptionProps } from "~/types/leaftlet_types";

const DEFAULT_POSITION = { lat: 37.8, lng: -96 };
const DEFAULT_ZOOM_LEVEL = 3.3;


const ExtraOption: React.FC<GeoLayerOptionProps> = ({ map, geo }) => {
  const [layerVisible, setLayerVisible] = useState<boolean>(true);
  const layerButtonLabel = layerVisible ? "Remove States Layer" : "Add States Layer";

  const onStateLayer = useCallback(() => {
    if (map && geo) {
      if (layerVisible) {
        map.removeLayer(geo);
      } else {
        map.addLayer(geo);
      }

      // Toggle the visibility state
      setLayerVisible((prev) => !prev);
    }
  }, [map, geo, layerVisible]);

  const onResetView = useCallback(() => {
    map?.setView(DEFAULT_POSITION, DEFAULT_ZOOM_LEVEL);
  }, [map]);

  return (
    <div className="dropdown dropdown-right dropdown-end">
    <div tabIndex={0} role="button" className="btn m-1">Menu</div>
    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
      <li onClick={onStateLayer}><a>{layerButtonLabel}</a></li>
      <li onClick={onResetView}><a>Reset View</a></li>
    </ul>
  </div>
  );
};


// GymMapInterface component for the main functionality
export default function GymMapInterface({ map, geo }: { map: L.Map | null, geo: L.GeoJSON}) {
  // State for the input value
  const [inputValue, setInputValue] = useState<string>("");
  const [stateOption, setStateOption] = useState<string>("");

  // Hook for handling location marker
  const locationMarker = useLocationMarker({ map });
  const router = useRouter();

  // Handler for input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value.toLowerCase());
  };

  const handleKeyDown = (event: any) => {
    const stateCorrdinatesMap = stateCoordinates[stateOption];

    const firstMatchingState = matchingStates[0];
    if (firstMatchingState) {
      setStateOption(firstMatchingState);
    }

    if (event.key === "Enter") {
      if (firstMatchingState) {
        setInputValue(stateOption);
      }
      // Fly to State on ENTER
      if (stateCorrdinatesMap) {
        router.push(`http://localhost:3000/gyms/${stateOption}`);
        map?.flyTo([stateCorrdinatesMap?.lat, stateCorrdinatesMap.lng], 5);
      } else {
        console.error(`Coordinates not found for state: ${stateOption}`);
      }
    }
  };

  // Filtering matching states based on the input value
  const matchingStates = states
    .filter((state) => state.toLowerCase().startsWith(inputValue))
    .sort(
      (a, b) =>
        Math.abs(a.localeCompare(inputValue)) -
        Math.abs(b.localeCompare(inputValue)),
    )
    .slice(0, 1);

  return (
    <div className="flex w-6/12 flex-col p-10 ">
      <div className="flex h-12 items-center justify-between">
        <div className="flex space-x-2">
          <div className="flex flex-col justify-center">
            {/* Input for entering a state */}
            <input
              id="stateInput"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter a State"
              className="border-gray z-0 border-2"
            />

            {/* Display matching states in a dropdown */}
            {inputValue.length > 1 && (
              <ul className="absolute z-0 w-24 rounded-md border border-gray-300 bg-white  opacity-50 shadow-lg">
                {matchingStates.map((state, index) => (
                  <li key={index}>{state}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Search button */}
          <Button variant='outline'>Search</Button>

          {/* Button to trigger the location marker */}
          <Button variant='outline' onClick={() => locationMarker}>
            Find my Location
          </Button>
          {/* <ExtraOption map={map} geo={geo}/> */}
        </div>
      </div>
    </div>
  );
}
