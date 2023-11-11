import React from "react";

import { useState } from "react";

// import { useForm } from "react-hook-form";

import styles from "./SignupForm.module.css";

const SignupForm = () => {
  // without react-hook-form
  const [signUpFormInputs, setSignUpFormInputs] = useState({
    firstName: "",
    lastName: "",
    alias: "",
  });

  // without react-hook-form
  const handleClearClick = () => {
    setSignUpFormInputs({
      ...signUpFormInputs,
      firstName: "",
      lastName: "",
      alias: "",
    });
  };

  const handleOnsubmitForm = (e) => {
    e.preventDefault();
    console.log("submit", signUpFormInputs);

    handleClearClick();
  };

  return (
    <div className={styles.signUpFormContainer}>
      <h3>Let's upate your profile!</h3>
      <form className={styles.signUpform} onSubmit={handleOnsubmitForm}>
        {/* firstName */}
        <div className={styles.signUpFormGroup}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={signUpFormInputs.firstName}
            onChange={(e) =>
              setSignUpFormInputs({
                ...signUpFormInputs,
                firstName: e.target.value,
              })
            }
          />
        </div>
        {/* lastName */}
        <div className={styles.signUpFormGroup}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={signUpFormInputs.lastName}
            onChange={(e) =>
              setSignUpFormInputs({
                ...signUpFormInputs,
                lastName: e.target.value,
              })
            }
          />
        </div>
        {/* alias */}
        <div className={styles.signUpFormGroup}>
          <label htmlFor="alias">Alias</label>
          <input
            type="text"
            name="alias"
            id="alias"
            value={signUpFormInputs.alias}
            onChange={(e) =>
              setSignUpFormInputs({
                ...signUpFormInputs,
                alias: e.target.value,
              })
            }
          />
        </div>

        <div className={styles.buttonsContainer}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
