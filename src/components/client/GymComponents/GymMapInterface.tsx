"use client";

import { useState } from "react";
import GymMap from "./GymMap";
import { states } from "~/utils/data/states";
import { useLocationMarker } from "~/functions/leaflet/locationMarker";

export default function GymMapInterface() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value.toLowerCase());
  };
  const matchingStates = states.filter((state) => state.startsWith(inputValue));

  const handleLocationClick = () => { 
console.log('click')
  }

  return (
    <div className="flex w-6/12 flex-col">
      <div className=" flex h-12 items-center justify-between">
        <div className="flex space-x-2">
          <div
            className="flex flex-col justify-center"
          >
            <input
              id="stateInput"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter a State"
              className="border-gray border-2 z-10"
            />
           {inputValue.length > 1 && <ul className="absolute w-24 bg-white border border-gray-300 rounded-md shadow-lg  z-50 opacity-50">
              <li>{matchingStates.slice(0,1)}</li>
            </ul> } 
          </div>
          <button className="btn btn-primary h-6/12">Search</button>
        </div>
		<div>
			<button >Find current location</button>
		</div>
        {/* <div className="flex flex-col items-center space-x-2">
          <input
           
            id="collapse-map"
            className="toggle"
            checked={true}
			onChange={undefined}
          />
          <label htmlFor="collapse-map">Collapse Map</label>
        </div> */}
      </div>
      <GymMap />
    </div>
  );
}
