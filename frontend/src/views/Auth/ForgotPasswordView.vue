<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const form = ref({
  email: "",
});
</script>

<template>
  <div
    class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">
          Forgot Password
        </h2>
      </div>

      <div
        class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg"
      >
        <form
          @submit.prevent="authStore.handleForgotPassword(form)"
          class="mt-8 space-y-6"
          novalidate
        >
          <div>
            <label for="email" class="form-label required">Email</label>
            <div class="form-group">
              <input
                v-model="form.email"
                type="email"
                name="email"
                id="email"
                autocomplete="email"
                class="form-input"
                placeholder="Email"
              />
              <span
                v-if="authStore.errors.email"
                class="text-red-500 text-xs ml-1"
                >{{ authStore.errors.email[0] }}</span
              >
            </div>
          </div>

          <div>
            <button type="submit" class="btn btn-primary">
              Email Password Reset Link
            </button>
          </div>
        </form>
        <p
          class="flex justify-center items-center text-sm text-gray-900 mt-4 gap-1"
        >
          <span>Remember your password?</span>
          <router-link
            :to="{ name: 'login' }"
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Login
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>
