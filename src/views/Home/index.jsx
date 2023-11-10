import React, { useEffect, useState } from "react";

import useFetchEvents from "../../hooks/useFetchEvents";

import Events from "../../components/Events";
import Navbar from "../../components/Navbar";

import Wrapper from "../../components/Wrapper";

import SearchBar from "../../components/SearchBar";

import styles from "./Home.module.css";

const Home = () => {
  const { events, page, isLoading, error, fetchEvents } = useFetchEvents();
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
    console.log(events);
    return <Events searchedTerm={searchedTerm} events={events} />;
  };

  // fetch searched event from the api
  const handleInputSearch = (searchedEventTerm) => {
    setSearchedTerm(searchedEventTerm);
    fetchEvents({ urlParams: `&keyword=${searchedEventTerm}` });
  };

  // logs
  // console.log("events", events);
  // console.log("page", page);
  // console.log("isLoading", isLoading);
  // console.log("error", error);

  return (
    <Wrapper>
      <SearchBar onSearch={handleInputSearch} />
      {renderEventsList()}
    </Wrapper>
  );
};

export default Home;
