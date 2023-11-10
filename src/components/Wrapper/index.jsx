import React from "react";

import styles from "./Wrapper.module.css";

import Navbar from "../../components/Navbar";

const Wrapper = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      {children}
    </div>
  );
};

export default Wrapper;
