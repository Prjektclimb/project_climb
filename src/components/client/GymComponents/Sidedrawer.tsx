"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import StateList from "./StateList";
import { useMediaQuery } from "~/functions&hooks/hooks/useMedia";



function DrawerMenu () { 

return  ( 

  <Button variant={'outline'} className="rotate-90 relative top-12 left-0  z-50">Open Menu</Button>
)

}





export default function SideDrawerNav() {

  const screenMatches = useMediaQuery('(max-width: 768px')

  

  // Base of view port, hide accordion, make side button to open a drop down/menu
  return (
  
    screenMatches ? (
      <DrawerMenu />
    ) : (
      <Accordion type="single" collapsible className="sm:pt-10">
        <AccordionItem value="item-1">
          <AccordionTrigger>View State List</AccordionTrigger>
          <AccordionContent>
            <StateList />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Additional Items TEST</AccordionTrigger>
          <AccordionContent>
            <p>Nothing to note</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  );
    }  