import React, { useEffect, useState } from "react";

import useEventsResult from "../../state/events-result";

import Events from "../../components/Events";
import Navbar from "../../components/Navbar";
import Wrapper from "../../components/Wrapper";
import SearchBar from "../../components/SearchBar";

import styles from "./Home.module.css";

const Home = () => {
  const { events, page, isLoading, error, fetchEvents } = useEventsResult();

  const [searchedTerm, setSearchedTerm] = useState("");

  useEffect(() => {
    fetchEvents({});
  }, []);

  const renderEventsList = () => {
    if (isLoading) {
      return <div>Lading data...</div>;
    }
    if (error) {
      return <div>Error when loading...</div>;
    }
    if (!events?.length > 0) {
      return <div>Sorry! There is no event with you search term.</div>;
    }
    return <Events searchedTerm={searchedTerm} />;
  };

  // fetch searched event from the api
  const handleInputSearch = (searchedEventTerm) => {
    setSearchedTerm(searchedEventTerm);
    fetchEvents({ urlParams: `&keyword=${searchedEventTerm}` });
  };

  return (
    <Wrapper>
      <SearchBar onSearch={handleInputSearch} />
      {renderEventsList()}
    </Wrapper>
  );
};

export default Home;
