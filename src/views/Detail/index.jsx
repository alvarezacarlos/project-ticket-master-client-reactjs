import React, { useEffect } from "react";

import { useParams, Link } from "react-router-dom";

import { format } from "date-fns";
import { es } from "date-fns/locale";

import useFetchEventById from "../../hooks/useFetchEventById";

import Wrapper from "../../components/Wrapper";
import Card from "../../components/Card";

import styles from "./Detail.module.css";

const Detail = () => {
  const { eventId } = useParams();
  const { event, isLoading, error, fetchEventById } = useFetchEventById();

  useEffect(() => {
    fetchEventById({ eventId });
  }, []);

  if (isLoading) {
    return (
      <Wrapper>
        <Card>
          <div>Loading...</div>
        </Card>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <Card>
          <div>Error...</div>
        </Card>
      </Wrapper>
    );
  }

  if (!event) {
    return (
      <Wrapper>
        <Card>
          <div>Event not found</div>
        </Card>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Card>
        <img className={styles.image} src={event.images?.[0].url} alt="" />

        <h4>{event.name}</h4>
        <p>{event.info}</p>

        {event.dates?.start.dateTime ? (
          <p>
            {format(new Date(event.dates?.start.dateTime), "d LLLL yyyy H:mm", {
              locale: es,
            })}{" "}
            hrs
          </p>
        ) : null}

        <Link to="/">See all events</Link>
      </Card>
    </Wrapper>
  );
};

export default Detail;
