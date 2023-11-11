import React from "react";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Wrapper from "../../components/Wrapper";

import SignupForm from "../../components/SignupForm";

import styles from './Profile.module.css'

const Profile = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const handleTabClick = (path) => {
    navigate(`/profile/${path}`);
  };

  return (
    <Wrapper>
      <SignupForm />
      <div className={styles.tabsContainer}>
        <span
          className={`${pathname.includes("my-info") ? styles.active : ""} ${
            styles.tab
          }`}

          onClick={() => handleTabClick("my-info")}

          style={{ marginRight: 8 }}
        >
          Profile
        </span>
        <span
          className={`${
            pathname.includes("liked-events") ? styles.active : ""
          } ${styles.tab}`}

          onClick={() => handleTabClick("liked-events")}
        >
          Liked Events
        </span>
      </div>
      <Outlet />
    </Wrapper>
  );
};

export default Profile;
