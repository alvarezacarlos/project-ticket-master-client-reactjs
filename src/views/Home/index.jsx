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
import Spinner from "../../components/Spinner";

import styles from "./Home.module.css";

const Home = () => {
  // const { events, page, isLoading, isError, error, fetchEvents } = useFetchEvents();
  // const { data, isLoading, isError, error, fetchEvents } = useFetchEvents();
  const { data, isLoading, isError, error, fetchEvents } = useEventsResult();

  const [searchedTerm, setSearchedTerm] = useState("");
  const [selectedPage, setSelectedPage] = useState(0);

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

  useEffect(() => {
    const searchedTermParam =
      searchedTerm?.trim().length > 0 ? `&keyword=${searchedTerm}` : "";
    refFetchEvents.current({
      urlParams: `${searchedTermParam}&page=${selectedPage}`,
    });
  }, [selectedPage]);

  const handlePageClick = useCallback(
    ({ selected }) => {
      setSelectedPage(selected);
    },
    [searchedTerm, fetchEvents]
  );

  const renderEventsList = () => {
    if (isLoading) {
      return <Spinner/>;
    }
    if (isError) {
      return <div>Error when loading...</div>;
    }
    if (!events?.length > 0) {
      return <div>Sorry! There is no event with your search term.</div>;
    }

    return (
      <div className="home">
        <Events />
      </div>
    );
  };

  return (
    <Wrapper>
      <SearchBar onSearch={handleInputSearch} />
      {renderEventsList()}

      <div style={{ visibility: isLoading || isError ? "hidden" : "visible" }}>
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
          pageCount={data?.page?.totalPages || 0}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          marginPagesDisplayed={0}
        />
      </div>
    </Wrapper>
  );
};

export default Home;
