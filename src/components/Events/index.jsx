import React from "react";
import EventItem from "./EventItem";

import { useNavigate } from "react-router-dom";

import useEventsResult from "../../state/events-result";

import styles from "./Events.module.css";

const Events = ({ searchedTerm }) => {
  const navigate = useNavigate();

  const { data } = useEventsResult();
  const events = data?._embedded?.events;

  let filteredEvents = events;

  if (searchedTerm.length > 0) {
    filteredEvents.find((eventItem) =>
      eventItem.name
        .toLocaleLowerCase()
        .includes(searchedTerm.toLocaleLowerCase())
    );
  }

  const handleEventItemClick = (eventId) => {
    navigate(`/detail/${eventId}`);
  };

  const renderEventsListItems = () => {    
    // return events.map((eventItem) => (
    return filteredEvents.map((eventItem) => (      
      <EventItem
        key={`event-item-${eventItem.id}`}
        name={eventItem.name}
        info={eventItem?.ticketLimit.info }
        image={eventItem.images[0].url}
        eventId={eventItem.id}
        onEventClick={handleEventItemClick}
      />
    ));
  };

  return <div className={styles.events}>{renderEventsListItems()}</div>;
};

export default Events;
