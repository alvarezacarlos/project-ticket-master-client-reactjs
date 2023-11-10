import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";

import ReactPaginate from "react-paginate";

import useEventsResult from "../../state/events-result";
// import useFetchEvents from "../../hooks/useFetchEvents";
import Events from "../../components/Events";
import Navbar from "../../components/Navbar";
import Wrapper from "../../components/Wrapper";
import SearchBar from "../../components/SearchBar";

import styles from "./Home.module.css";

const Home = () => {
  // const { events, page, isLoading, error, fetchEvents } = useFetchEvents();
  // const { data, isLoading, error, fetchEvents } = useFetchEvents();
  const { data, isLoading, error, fetchEvents } = useEventsResult();

  const [searchedTerm, setSearchedTerm] = useState("");

  const events = useMemo(
    () => data?._embedded?.events || [],
    [data?._embedded?.events]
  );
  const page = useMemo(() => data?.page || {}, [data?.page]);
  // const events = data?._embedded?.events || []
  // const page = data?.page || {}


  const refFetchEvents = useRef();
  refFetchEvents.current = fetchEvents;

  useEffect(() => {
    refFetchEvents.current({});
  }, []);

  // fetch searched event from the api
  const handleInputSearch = (searchedEventTerm) => {
    setSearchedTerm(searchedEventTerm);
    fetchEvents({ urlParams: `&keyword=${searchedEventTerm}` });
  };



  const handlePageClick = useCallback(
    ({ selected }) => {
      const searchedTermParam =
        searchedTerm?.trim().length > 0 ? `&keyword=${searchedTerm}` : "";
      fetchEvents({ urlParams: `${searchedTermParam}&page=${selected}` });
      console.log(selected);
      console.log(`${searchedTermParam}&page=${selected}`);
    },
    [searchedTerm, fetchEvents]
  );

  const renderEventsList = () => {
    if (isLoading) {
      return <div>Loading data...</div>;
    }
    if (error) {
      return <div>Error when loading...</div>;
    }
    if (!events?.length > 0) {
      return <div>Sorry! There is no event with you search term.</div>;
    }    

    return <div className="home">{<Events searchedTerm={searchedTerm} />}</div>;
  };

  console.log(events)

  return (
    <Wrapper>
      <SearchBar onSearch={handleInputSearch} />
      {renderEventsList()}      
      <ReactPaginate
        className={styles.pagination}
        pageClassName={styles.page}
        activeClassName={styles.activePage}
        disabledClassName={styles.disabledPage}
        nextClassName={styles.next}
        previousClassName={styles.previous}
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        renderOnZeroPageCount={null}
        pageCount={page.totalPages}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}   
        style={{visibility: isLoading ? 'hidden': 'block'}}
        marginPagesDisplayed={0}
      />
    </Wrapper>
  );
};

export default Home;
