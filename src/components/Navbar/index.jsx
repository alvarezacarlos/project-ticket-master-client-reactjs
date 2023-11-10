import React from "react";

import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const onEventClick = () => {};

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>Tickets</div>
        <ul className={styles.navList}>
          <li className={styles.navListItem}>
            <Link className={styles.navListLink} to="/my-profile">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
