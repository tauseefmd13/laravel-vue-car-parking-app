import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import axios from "@/lib/axios";
const toast = useToast();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authUser: null,
    authStatus: null,
    authErrors: [],
  }),
  getters: {
    user: (state) => state.authUser,
    status: (state) => state.authStatus,
    errors: (state) => state.authErrors,
  },
  actions: {
    async csrf() {
      await axios.get("/sanctum/csrf-cookie");
    },
    async getUser() {
      await this.csrf();
      try {
        const response = await axios.get("/api/v1/profile");
        this.authUser = response.data.data;
      } catch(error) {
        console.log('Error: ', error);
      }
    },
    async updateUser(data) {
      this.authErrors = [];

      try {
        const response = await axios.put(`/api/v1/profile`, data);
        this.authUser = response.data.data;
        toast.success(response.data.message);
      } catch (error) {
        if (error.response?.status === 422) {
          this.authErrors = error.response.data.errors;
        } else {
          toast.error(error.response?.data?.message);
          throw error;
        }
      }
    },
    async updatePassword(data) {
      this.authErrors = [];

      try {
        const response = await axios.put(`/api/v1/change-password`, data);
        toast.success(response.data.message);
        this.handleLogout();
      } catch (error) {
        if (error.response?.status === 422) {
          this.authErrors = error.response.data.errors;
        } else {
          toast.error(error.response?.data?.message);
          throw error;
        }
      }
    },
    async handleLogin(data) {
      await this.csrf();
      this.authErrors = [];

      try {
        await axios.post("/api/v1/login", {
          email: data.email,
          password: data.password,
        });
        await this.getUser();
        toast.success("Logged in successfully.");
        this.router.push("/");
      } catch (error) {
        if (error.response?.status === 422) {
          this.authErrors = error.response.data.errors;
        } else {
          toast.error(error.response?.data?.message);
          throw error;
        }
      }
    },
    async handleRegister(data) {
      await this.csrf();
      this.authErrors = [];

      try {
        await axios.post("/api/v1/register", {
          name: data.name,
          email: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation,
        });
        await this.getUser();
        toast.success("Registered successfully.");
        this.router.push("/");
      } catch (error) {
        if (error.response?.status === 422) {
          this.authErrors = error.response.data.errors;
        } else {
          toast.error(error.response?.data?.message);
          throw error;
        }
      }
    },
    async handleForgotPassword(data) {
      await this.csrf();
      this.authErrors = [];

      try {
        const response = await axios.post("/api/v1/forgot-password", {
          email: data.email,
        });
        this.authStatus = response.data.status;
        toast.success(response.data.status);
      } catch (error) {
        if (error.response?.status === 422) {
          this.authErrors = error.response.data.errors;
        } else {
          toast.error(error.response?.data?.message);
          throw error;
        }
      }
    },
    async handleResetPassword(data) {
      await this.csrf();
      this.authErrors = [];

      try {
        const response = await axios.post("/api/v1/reset-password", {
          token: data.token,
          email: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation,
        });
        this.authStatus = response.data.status;
        toast.success(response.data.status);
      } catch (error) {
        if (error.response.status === 422) {
          this.authErrors = error.response.data.errors;
        } else {
          toast.error(error.response?.data?.message);
          throw error;
        }
      }
    },
    async handleLogout() {
      await axios.post("/api/v1/logout");
      this.authUser = null;
      this.router.push("/login");
    },
  },
});
