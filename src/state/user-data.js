import { create } from "zustand";

const USER_DATA = "userData";

// Store values gabally
const useUserData = create((set) => ({
  userData: {},
  isLoading: false,
  error: null,
  updateUserData: async ({ ...updatedUserData }) => {
    try {      
      await set(() => ({
        isLoading: true,
        error: null,
      }));
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await localStorage.setItem(USER_DATA, JSON.stringify(updatedUserData));
      await set(() => ({
        userData: updatedUserData,
        isLoading: false,
      }));
    } catch (responseError) {
      set({ error: responseError, isLoading: false });
    }
  },
  fetchUserData: async () => {    
    try {
      const response = (await localStorage.getItem(USER_DATA)) || {};
      const result = await JSON.parse(response);      
      await set(() => ({
        userData: result || {},
      }));
    } catch (responseError) {
      await set(() => ({ error: responseError }));      
    }
  },
}));

export default useUserData;