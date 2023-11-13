import React from "react";

import styles from "./EventItem.module.css";

import likedEventImage from "../../../assets/likedEventImage.png";
import unlikedEventImage from "../../../assets/unlikedEventImage.png";

import useEventsResult from "../../../state/events-result";

const EventItem = ({ eventId, onEventClick, onEventLike }) => {
  const { data } = useEventsResult();

  const eventItem = data?._embedded?.events.find(
    (event) => event.id === eventId
  );

  const name = eventItem?.name;
  const info = eventItem?.ticketLimit?.info;
  const image = eventItem?.images[0]?.url;
  const liked = eventItem?.liked;

  const handleSeeMoreClick = (e) => {
    e.stopPropagation();
    onEventClick(eventId);
  };

  const handleLikeImage = () => {    
    onEventLike(eventId);
  }; 

  return (
    <div
      className={styles.eventItemContainer}      
    >
      <div className={styles.imagesContainer}>        
        <img
          src={liked ? likedEventImage : unlikedEventImage}
          alt="Like Button"
          className={styles.likeImage}
          onClick={handleLikeImage}
        />
        <img src={image} alt={name} className={styles.image} />
      </div>
      <div className={styles.eventItemDetailsContianer}>
        <div className={styles.eventItemDetails}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.info}>{info}</p>
          <button
            className={styles.readMoreButton}
            onClick={handleSeeMoreClick}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventItem;
