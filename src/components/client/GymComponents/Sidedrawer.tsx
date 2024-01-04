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

  return (
    <Accordion type="single" collapsible className=" sm:pt-10">
      <AccordionItem value="item-1">
        <AccordionTrigger>View State List</AccordionTrigger>
        <AccordionContent>
          <StateList />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
