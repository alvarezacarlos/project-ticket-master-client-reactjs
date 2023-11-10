import React, { useState } from "react";

import styles from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const [searchedEventTerm, setSearchedEventTerm] = useState('');

  const handleOnChange = (e) => {
    setSearchedEventTerm(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {      
      onSearch(searchedEventTerm);
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        name=""
        id=""
        placeholder="Search for your event"
        value={searchedEventTerm}
        onChange={handleOnChange}
        onKeyDown={handleInputKeyDown}
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;
