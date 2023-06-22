import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import axios from "@/lib/axios";
const toast = useToast();

export const useParkingStore = defineStore("parking", {
  state: () => ({
    items: [],
    item: null,
    metaObj: null,
    successMessage: null,
    errorMessage: null,
    validationErrors: [],
    isLoading: false,
  }),
  getters: {
    parkings: (state) => state.items,
    parking: (state) => state.item,
    meta: (state) => state.metaObj,
    success: (state) => state.successMessage,
    error: (state) => state.errorMessage,
    errors: (state) => state.validationErrors,
    loading: (state) => state.isLoading,
  },
  actions: {
    async getParking(id) {
      try {
        const response = await axios.get(`/api/v1/parkings/${id}`);
        this.item = response.data?.data;
      } catch(error) {
        console.log(error);
      }
    },
    async getParkings(page = 1) {
      try {
        const response = await axios.get(`/api/v1/parkings?page=${page}`);
        this.items = response.data?.data;
        this.metaObj = response.data?.meta;
      } catch(error) {
        console.log(error);
      }
    },
    async getNextParkings(page = 1) {
      this.isLoading = true;

      try {
        const response = await axios.get(`/api/v1/parkings?page=${page}`);
        setTimeout(() => {
          this.isLoading = false;
          this.items = [...this.items, ...response.data?.data];
          this.metaObj = response.data?.meta;
        }, 2000);
      } catch(error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    async storeParking(data) {
      this.validationErrors = [];

      try {
        const response = await axios.post("/api/v1/parkings", data);
        this.items.push(response.data?.data);
        toast.success(response.data?.message);
        this.router.push("/parkings");
      } catch (error) {
        if (error.response?.status === 422) {
          this.validationErrors = error.response.data.errors;
        } else {
          toast.error(error.response?.data?.message);
          throw error;
        }
      }
    },
    async updateParking(id, data) {
      this.validationErrors = [];

      try {
        const response = await axios.put(`/api/v1/parkings/${id}`, data);
        const newArray = this.items.map((value) => {
          if (value.id == id) {
            return {
              ...value,
              stop_time: response.data?.data?.stop_time,
              total_price: response.data?.data?.total_price,
              format_total_price: response.data?.data?.format_total_price,
              completed: true,
            };
          } else {
            return value;
          }
        });
        this.item = response.data?.data;
        this.items = newArray;
        toast.success(response.data?.message);
        this.router.push("/parkings");
      } catch (error) {
        if (error.response?.status === 422) {
          this.validationErrors = error.response.data.errors;
        } else {
          toast.error(error.response?.data?.message);
          throw error;
        }
      }
    },
    clearCompletedParkings() {
      this.items = this.items.map((value) => {
        if (value?.completed === true) {
          return {
            ...value,
            completed: false,
          };
        } else {
          return value;
        }
      });
    },
  },
});
