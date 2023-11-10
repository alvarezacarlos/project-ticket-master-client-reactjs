import { create } from "zustand";

// Store values gabally
const useEventsResult = create((set) => ({
  events: [],
  page: {},
  isLoading: false,
  error: null,
  fetchEvents: async (params) => {
    await set(() => ({ isLoading: true }));

    const { urlParams } = params;
    const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY || "";
    const OPTIONAL_URL_PARAMS = urlParams?.length ? urlParams : "";
    const API_URL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&countryCode=MX${OPTIONAL_URL_PARAMS}`;
    try {
      const response = await fetch(API_URL);
      const result = await response.json();

      await set(() => ({
        events: result?._embedded?.events || [],
        isLoading: false,
        page: result?.page || {},
      }));
    } catch (responseError) {
      await set(() => ({ error: responseError }));
    }
  },
}));

export default useEventsResult;
