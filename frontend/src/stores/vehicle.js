import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import axios from "@/lib/axios";
const toast = useToast();

export const useVehicleStore = defineStore("vehicle", {
  state: () => ({
    items: [],
    item: null,
    successMessage: null,
    errorMessage: null,
    validationErrors: [],
  }),
  getters: {
    vehicles: (state) => state.items,
    vehicle: (state) => state.item,
    success: (state) => state.successMessage,
    error: (state) => state.errorMessage,
    errors: (state) => state.validationErrors,
  },
  actions: {
    async getVehicle(id) {
      try {
        const response = await axios.get(`/api/v1/vehicles/${id}`);
        this.item = response.data?.data;
      } catch(error) {
        console.log(error);
      }
    },
    async getVehicles() {
      try {
        const response = await axios.get("/api/v1/vehicles");
        this.items = response.data?.data;
      } catch(error) {
        console.log(error);
      }
    },
    async storeVehicle(data) {
      this.validationErrors = [];

      try {
        const response = await axios.post("/api/v1/vehicles", data);
        this.items.push(response.data?.data);
        toast.success(response.data?.message);
        this.router.push("/vehicles");
      } catch (error) {
        if (error.response?.status === 422) {
          this.validationErrors = error.response.data.errors;
        } else {
          toast.error(error.response?.data?.message);
          throw error;
        }
      }
    },
    async updateVehicle(id, data) {
      this.validationErrors = [];

      try {
        const response = await axios.put(`/api/v1/vehicles/${id}`, data);
        const newArray = this.items.map((value) => {
          if (value.id == id) {
            return {
              ...value,
              plate_number: response.data?.data?.plate_number,
            };
          } else {
            return value;
          }
        });
        this.item = response.data?.data;
        this.items = newArray;
        toast.success(response.data?.message);
        this.router.push("/vehicles");
      } catch (error) {
        if (error.response?.status === 422) {
          this.validationErrors = error.response.data.errors;
        } else {
          toast.error(error.response?.data?.message);
          throw error;
        }
      }
    },
  },
});
