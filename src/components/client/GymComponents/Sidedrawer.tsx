"use client";

import { Suspense, useState } from "react";
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
import GymsCompleteList from "./GymsCompleteList";

import Loading from "~/app/gyms/loading";

function DrawerMenu() {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button variant={"outline"}>Open Menu</Button>
      </DrawerTrigger>
      <DrawerContent>
        <AccordionList />
      </DrawerContent>
    </Drawer>
  );
}

function AccordionList() {
  return (
    <Accordion type="single" collapsible className="ml-2 sm:pt-10 lg:w-72 lg:h-24">
      <AccordionItem value="item-1">
        <AccordionTrigger>View State List</AccordionTrigger>
        <AccordionContent>
          <StateList />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>View all Gyms</AccordionTrigger>
        <AccordionContent>
          <Suspense fallback={<Loading />}>
            <GymsCompleteList />
          </Suspense>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default function SideDrawerNav() {
  const screenMatches = useMediaQuery("(max-width: 1023px");

  return screenMatches ? <DrawerMenu /> : <AccordionList />;
}
