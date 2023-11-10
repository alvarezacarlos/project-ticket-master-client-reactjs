import { useState } from "react";

const useFetchEvents = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  // function to fetch data
  const fetchEvents = async ({ ...params }) => {    

    const { urlParams } = params

    const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY || ''
    const OPTIONAL_URL_PARAMS = urlParams?.length ? urlParams : ''
    const API_URL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&countryCode=MX${OPTIONAL_URL_PARAMS}`    

    try {
      const response = await fetch(API_URL);
      const result = await response.json();

      setData(result);
      setIsLoading(false);
    } catch (responseError) {
      setIsLoading(false);
      setError(responseError);
    }
  };

  // return {
  //   events: data?._embedded?.events,
  //   page: data?.page,
  //   isLoading,
  //   error,
  //   fetchEvents,
  // };


  return {
    data,
    isLoading,
    error,
    fetchEvents,
  };


};

export default useFetchEvents;
