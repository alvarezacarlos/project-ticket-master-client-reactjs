import { json } from "react-router-dom";
import { create } from "zustand";

// Store values gabally
const useEventsResult = create((set) => ({
  data: [],
  isLoading: false,
  isError: false,
  error: null,
  fetchEvents: async (params) => {
    await set(() => ({ isLoading: true, error: null, isError: false }));
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const { urlParams } = params;
    const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY || "";
    const OPTIONAL_URL_PARAMS = urlParams?.length ? urlParams : "";
    const API_URL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&countryCode=MX${OPTIONAL_URL_PARAMS}`;
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      const likedEvents =
        (await JSON.parse(localStorage.getItem("likedEvents"))) || [];

      // console.log("before - result", result);

      result._embedded.events = result?._embedded?.events.map((event) => {
        return {
          ...event,
          liked: likedEvents.includes(event.id),
        };
      });

      // console.log("after - result", result);

      await set(() => ({
        data: result || [],
        isLoading: false,
        isError: false,
      }));
    } catch (responseError) {
      await set(() => ({
        error: responseError,
        isLoading: false,
        isError: true,
      }));

      // console.log(responseError);
    }
  },
  updateLikedEvent: async (eventId) => {
    try {
      //update local storage liked events
      let likedEvents =
        (await JSON.parse(localStorage.getItem("likedEvents"))) || [];
      const eventIndex = likedEvents.indexOf(eventId);
      if (eventIndex !== -1) {
        likedEvents.splice(eventIndex, 1);
      } else {
        likedEvents.push(eventId);
      }
      await set((state) => {
        state.data._embedded.events = state.data._embedded.events.map(
          (event) => {
            //udpate zustand store state
            if (event.id === eventId) {
              event.liked = !event.liked;
            }
            return event;
          }
        );

        return { ...state };
      });      
      await localStorage.setItem("likedEvents", JSON.stringify(likedEvents));
    } catch (error) {
      // console.log(error);
    }
  },
}));

export default useEventsResult;