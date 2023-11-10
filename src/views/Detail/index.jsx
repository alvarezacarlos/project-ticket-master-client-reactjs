import React, { useEffect } from "react";

import { useParams, Link } from "react-router-dom";

import { format } from "date-fns";
import { es } from "date-fns/locale";

// import useFetchEventById from "../../hooks/useFetchEventById";
import useEventsResult from "../../state/events-result";

import Wrapper from "../../components/Wrapper";
import Card from "../../components/Card";

import styles from "./Detail.module.css";

const Detail = () => {
  const { eventId } = useParams();
  const { data  } = useEventsResult();
  const events = data?._embedded?.events

  const eventClicked = events.find((eventItem) => eventItem.id === eventId);

  if (!eventClicked) {
    return (
      <Wrapper>
        <Card>
          <div>Sorry! We could not load the Event details.</div>
        </Card>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Card>
        <img
          className={styles.image}
          src={eventClicked.images?.[0].url}
          alt=""
        />

        <h4>{eventClicked.name}</h4>
        <p>{eventClicked.info}</p>

        {eventClicked.dates?.start.dateTime ? (
          <p>
            {format(
              new Date(eventClicked.dates?.start.dateTime),
              "d LLLL yyyy H:mm",
              {
                locale: es,
              }
            )}{" "}
            hrs
          </p>
        ) : null}

        <Link to="/">See all events</Link>
      </Card>
    </Wrapper>
  );
};

export default Detail;
