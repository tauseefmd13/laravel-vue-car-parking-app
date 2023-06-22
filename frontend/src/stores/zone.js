import { defineStore } from "pinia";
import axios from "@/lib/axios";

export const useZoneStore = defineStore("zone", {
  state: () => ({
    items: [],
    item: null,
    successMessage: null,
    errorMessage: null,
    validationErrors: [],
  }),
  getters: {
    zones: (state) => state.items,
    zone: (state) => state.item,
    success: (state) => state.successMessage,
    error: (state) => state.errorMessage,
    errors: (state) => state.validationErrors,
  },
  actions: {
    async getZone(id) {
      try {
        const response = await axios.get(`/api/v1/zones/${id}`);
        this.item = response.data.data;
      } catch(error) {
        console.log(error);
      }
    },
    async getZones() {
      try {
        const response = await axios.get("/api/v1/zones");
        this.items = response.data.data;
      } catch(error) {
        console.log(error);
      }
    },
  },
});
