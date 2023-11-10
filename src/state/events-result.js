import { create } from "zustand";

// Store values gabally
const useEventsResult = create((set) => ({
  data: [],
  isLoading: false,
  error: null,
  fetchEvents: async (params) => {
    set(() => ({ isLoading: true, error: null }));

    const { urlParams } = params;
    const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY || "";
    const OPTIONAL_URL_PARAMS = urlParams?.length ? urlParams : "";
    const API_URL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&countryCode=MX${OPTIONAL_URL_PARAMS}`;
    try {
      const response = await fetch(API_URL);
      const result = await response.json();

      set(() => ({
        data: result || []
        , isLoading: false 
      }));
    } catch (responseError) {
      set(() => ({ error: responseError, isLoading: false }));
    }
  },
}));

export default useEventsResult;
