"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "~/@/components/ui/accordion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/@/components/ui/drawer";
import { Button } from "~/@/components/ui/button";
import StateList from "src/components/client/GymComponents/StateList";
import { useMediaQuery } from "~/functions&hooks/hooks/useMedia";



function DrawerMenu () { 

return  ( 
<Drawer>
  <DrawerTrigger>
  <Button variant={'outline'}>Open Menu</Button>
  </DrawerTrigger>
<DrawerContent>
<AccordionList /> 
</DrawerContent>

</Drawer>

)

}

function AccordionList () { 

  return (
  <Accordion type="single" collapsible className="sm:pt-10 ml-2">
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

)}



export default function SideDrawerNav() {

  const screenMatches = useMediaQuery('(max-width: 768px')

  return (  
    screenMatches ? (
      <DrawerMenu />
    ) : (
    <AccordionList /> 
    )
  );
    }  