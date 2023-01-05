// Utilities
import { defineStore } from "pinia";

const useAppStore = defineStore("appStore", () => {
  const APIBaseURI = import.meta.env.VITE_API_BASE_URI;

  return { APIBaseURI };
});

export default useAppStore;
