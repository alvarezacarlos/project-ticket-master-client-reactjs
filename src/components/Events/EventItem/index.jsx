import React from "react";

import styles from "./EventItem.module.css";

const EventItem = ({ name, info, image, eventId, onEventClick }) => {

  const handleSeeMoreClick = e => {
    e.stopPropagation()
    onEventClick(eventId)
  }

  return (
    <div className={styles.eventItemContainer}>
      <img src={image} alt={name} className={styles.image} />      
      <div className={styles.eventItemDetails}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.info}>{info}</p>
        <button className={styles.readMoreButton} onClick={handleSeeMoreClick}>Read More</button>
      </div>
    </div>
  );
};

export default EventItem;
