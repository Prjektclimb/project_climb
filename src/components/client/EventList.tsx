'use client'

import React from "react";


export interface EventsType { 
  id?: number,
  event?: string,
  resultsURL?: string
}
interface EventListProps {
  data: EventsType | null
}

export const EventList: React.FC<EventListProps> = ({ data }) => {
  if (!data) {
    return (
      <div>
        <p>No event data available</p>
      </div>
    );
  }

  return (
    <>
      <p>Hello World</p>
      <ul>
        <li key={data.id}>{data.resultsURL}</li>
      </ul>
    </>
  );
};