import React from "react";
import EventItem from "./EventItem";

import { useNavigate, useLocation, Link } from "react-router-dom";

import useEventsResult from "../../state/events-result";

import styles from "./Events.module.css";

const Events = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const { data, updateLikedEvent } = useEventsResult();
  const events = data?._embedded?.events;

  let filteredEvents = events;

  
  if (pathname.includes("liked-events")) {
    filteredEvents = events?.filter((event) => event.liked === true);
  }

  console.log("filteredEvents", filteredEvents);

  const handleEventItemClick = (eventId) => {
    navigate(`/detail/${eventId}`);
  };

  if (pathname.includes("liked-events") & !filteredEvents?.length > 0) {
    return <div>You do not have favorite events yet.</div>
  }  

  const renderEventsListItems = () => {
    return filteredEvents?.map((eventItem) => (
      <EventItem
        key={`event-item-${eventItem.id}`}
        eventId={eventItem.id}
        onEventClick={handleEventItemClick}
        onEventLike={updateLikedEvent}
      />
    ));
  };

  return <div className={styles.events}>{renderEventsListItems()}</div>;
};

export default Events;
