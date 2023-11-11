import React from "react";

import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";

const Navbar = () => {  

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <div className={styles.logo}><Link to='/' className={styles.navListLink}>Tickets</Link></div>
        <ul className={styles.navList}>
          <li className={styles.navListItem}>
            <Link className={styles.navListLink} to="/profile">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
