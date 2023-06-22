<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const authStore = useAuthStore();

const form = ref({
  token: route.params.token,
  email: route.query.email,
  password: "",
  password_confirmation: "",
});
</script>

<template>
  <div
    class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">
          Reset Password
        </h2>
      </div>

      <div
        class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg"
      >
        <form
          @submit.prevent="authStore.handleResetPassword(form)"
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
                readonly
              />
              <span
                v-if="authStore.errors.email"
                class="text-red-500 text-xs ml-1"
                >{{ authStore.errors.email[0] }}</span
              >
            </div>
          </div>

          <div>
            <label for="password" class="form-label required">Password</label>
            <div class="form-group">
              <input
                v-model="form.password"
                type="password"
                name="password"
                id="password"
                autocomplete="new-password"
                class="form-input"
                placeholder="Password"
              />
              <span
                v-if="authStore.errors.password"
                class="text-red-500 text-xs ml-1"
                >{{ authStore.errors.password[0] }}</span
              >
            </div>
          </div>

          <div>
            <label for="password-confirmation" class="form-label required"
              >Confirm Password</label
            >
            <div class="form-group">
              <input
                v-model="form.password_confirmation"
                type="password"
                name="password_confirmation"
                id="password-confirmation"
                autocomplete="new-password"
                class="form-input"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <div>
            <button type="submit" class="btn btn-primary">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
