"use client";

import { useState, useCallback } from "react";
import { states } from "~/utils/data/states";
import { useLocationMarker } from "~/functions&hooks/leaflet/hooks/locationMarker";
import { stateCoordinates } from "~/utils/data/states_latlng";

const DEFAULT_POSITION = { lat: 37.8, lng: -96 };
const DEFAULT_ZOOM_LEVEL = 3.3;

const ResetZoom = ({ map }: { map: L.Map | null }) => {
  const onClick = useCallback(() => {
    map?.setView(DEFAULT_POSITION, DEFAULT_ZOOM_LEVEL);
  }, [map]);

  return (
    <button className="btn btn-secondary" onClick={onClick}>
      Reset View
    </button>
  );
};

// GymMapInterface component for the main functionality
export default function GymMapInterface({
  map,
  geo,
}: {
  map: L.Map | null;
  geo: L.GeoJSON | null;
}) {
  // State for the input value
  const [inputValue, setInputValue] = useState<string>("");
  const [stateOption, setStateOption] = useState<string>("");

  // Hook for handling location marker
  const locationMarker = useLocationMarker({ map });

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
        console.log("firstmatching on Enter", firstMatchingState);
        console.log("state option on enter", stateOption);
      }

      if (stateCorrdinatesMap) {
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
    <div className="flex w-6/12 flex-col p-2">
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
              className="border-gray z-10 border-2"
            />

            {/* Display matching states in a dropdown */}
            {inputValue.length > 1 && (
              <ul className="absolute z-50 w-24 rounded-md border border-gray-300 bg-white  opacity-50 shadow-lg">
                {matchingStates.map((state, index) => (
                  <li key={index}>
                    {state}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Search button */}
          <button className="btn btn-primary h-12">Search</button>

          {/* Button to trigger the location marker */}
          <button className="btn btn-secondary" onClick={() => locationMarker}>
            Find my Location
          </button>

          {/* ResetZoom component */}
          <ResetZoom map={map} />
        </div>
      </div>
    </div>
  );
}
