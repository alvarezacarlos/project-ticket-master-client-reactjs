import React from "react";

import { useState } from "react";

import useUserData from "../../state/user-data";

import Spinner from "../Spinner";

import styles from "./SignupForm.module.css";

const USER_DATA = "userData";

const SignupForm = () => {
  const { updateUserData, isLoading, error } = useUserData();

  // without react-hook-form
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    alias: "",
  });

  // without react-hook-form
  const handleClearClick = () => {
    setUserData({
      ...userData,
      firstName: "",
      lastName: "",
      alias: "",
    });
  };

  const handleOnsubmitForm = (e) => {
    e.preventDefault();
    updateUserData({ ...userData });
    handleClearClick();
  };

  return (
    <div className={styles.signUpFormContainer}>
      <h3>Update Profile ?</h3>
      <form className={styles.signUpform} onSubmit={handleOnsubmitForm}>
        {/* firstName */}
        <div className={styles.signUpFormGroup}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={userData.firstName}
            onChange={(e) =>
              setUserData({
                ...userData,
                firstName: e.target.value,
              })
            }
            required
          />
        </div>
        {/* lastName */}
        <div className={styles.signUpFormGroup}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={userData.lastName}
            onChange={(e) =>
              setUserData({
                ...userData,
                lastName: e.target.value,
              })
            }
            required
          />
        </div>
        {/* alias */}
        <div className={styles.signUpFormGroup}>
          <label htmlFor="alias">Alias</label>
          <input
            type="text"
            name="alias"
            id="alias"
            value={userData.alias}
            onChange={(e) =>
              setUserData({
                ...userData,
                alias: e.target.value,
              })
            }
            required
          />
        </div>

        <div className={styles.buttonsContainer}>
          <button type="submit">Submit</button>
        </div>

        {/* <div className={styles.overlay} style={{visibility: isLoading ? 'visible': 'hidden'}}> */}
        <div className={styles.overlay} style={{display: isLoading ? 'flex': 'none'}}>          
          <Spinner />
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
