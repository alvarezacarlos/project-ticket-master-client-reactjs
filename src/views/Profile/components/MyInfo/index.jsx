import React, { useEffect, useState } from "react";

import useUserData from "../../../../state/user-data";

import styles from "./MyInfo.module.css";

const USER_DATA = "userData";

const MyInfo = () => {

  const { userData, fetchUserData } = useUserData()

  useEffect(() => {
    fetchUserData();    
  }, []);  

  if (!Object.keys(userData).length > 0) {
    return <div>You do not a profile yet!</div>;
  }  

  return (
    <div className={styles.infoContainer}>
      <p>{`First Name: ${userData.firstName}`}</p>
      <p>{`Last Name: ${userData.lastName}`}</p>
      <p>{`Alias: ${userData.alias}`}</p>
    </div>
  );
};

export default MyInfo;
