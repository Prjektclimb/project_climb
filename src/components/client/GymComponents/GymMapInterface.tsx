"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { states } from "~/utils/data/states";
import { useLocationMarker } from "~/functions&hooks/hooks/useLocationMarker";
import { stateCoordinates } from "~/utils/data/states_latlng";
import { Button } from "~/@/components/ui/button";
import { GeoLayerOptionProps } from "~/types/leaftlet_types";
import {  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger, } from "@radix-ui/react-dropdown-menu";
;



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
    <div className="">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='default'> Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative z-50 bg-background w-full px-2 py-6 border m-2 border-black">
        <DropdownMenuLabel>Map Options</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup> 
        <DropdownMenuItem>
          <Button variant='outline' onClick={onResetView}>Reset View</Button>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator>
        <DropdownMenuItem>
          <Button  variant='default' onClick={onStateLayer}>{layerButtonLabel}</Button>
        </DropdownMenuItem>
      </DropdownMenuSeparator>
      </DropdownMenuContent>
    </DropdownMenu>

    </div>
  );
};


// GymMapInterface component for the main functionality
export default function GymMapInterface({ map, geo }: { map: L.Map | null, geo: L.GeoJSON}) {
  

  // Hook for handling location marker
  const locationMarker = useLocationMarker({ map });
 
  return (
    
      
        <div className="relative flex lg:flex-row flex-col justify-center w-full space-x-2 m-2">
          <Button variant='outline' onClick={() => locationMarker}>
            Find my Location
          </Button>
          <ExtraOption map={map} geo={geo}/>
        </div>


  );
}
