"use client";

import { useState, useRef, useCallback } from "react";
import GymMap from "./GymMap";
import { states } from "~/utils/data/states";

const DEFAULT_POSITION = { lat: 37.8, lng: -96 };
const DEFAULT_ZOOM_LEVEL = 3.3;

const StateZoom = ({ map}: {map: L.Map | null}) => {
	const [position, setPosition] = useState(() => map?.getCenter());
	const onClick = useCallback(() => {
	  map?.setView(DEFAULT_POSITION, DEFAULT_ZOOM_LEVEL)
	}, [map]);
  
	return( <button className="bg-green" onClick={onClick}>Reset View</button>) 
  };
  

export default function GymMapInterface({map}: {map: L.Map | null}) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value.toLowerCase());
  };
  const matchingStates = states.filter((state) => state.startsWith(inputValue));

  const handleLocationMarker = () => {};

  return (
    <div className="flex w-6/12 flex-col">
      <div className=" flex h-12 items-center justify-between">
        <div className="flex space-x-2">
          <div className="flex flex-col justify-center">
            <input
              id="stateInput"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter a State"
              className="border-gray z-10 border-2"
            />
            {inputValue.length > 1 && (
              <ul className="absolute z-50 w-24 rounded-md border border-gray-300 bg-white  opacity-50 shadow-lg">
                <li>{matchingStates.slice(0, 1)}</li>
              </ul>
            )}
          </div>
          <button className="btn btn-primary h-6/12">Search</button>
        </div>
        <div>
          <button className="btn btn-accent" onClick={handleLocationMarker}>
            Find current location
          </button>
        </div>
		<StateZoom map={map} />
      </div>
    </div>
  );
}
