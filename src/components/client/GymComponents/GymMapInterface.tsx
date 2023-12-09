"use client";

import { useState, useRef } from "react";
import GymMap from "./GymMap";
import { states } from "~/utils/data/states";

export default function GymMapInterface() {
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
      </div>
      <GymMap />
    </div>
  );
}
