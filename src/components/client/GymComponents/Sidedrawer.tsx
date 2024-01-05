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
import StateList from "./StateList";

export default function SideDrawerNav() {
  const [accordionStates, setAccordionStates] = useState([false, false]);

  // Base of view port, hide accordion, make side button to open a drop down/menu 
  return (
    <Accordion type="single" collapsible className="sm:pt-10">
      <AccordionItem value="item-1">
        <AccordionTrigger>View State List</AccordionTrigger>
        <AccordionContent>
          <StateList />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>addiontal items TEST</AccordionTrigger>
        <AccordionContent>
      <p>Nothing to note</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
