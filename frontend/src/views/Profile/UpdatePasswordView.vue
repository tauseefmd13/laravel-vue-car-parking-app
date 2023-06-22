<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const form = ref({
  current_password: "",
  password: "",
  password_confirmation: "",
});

const submit = () => {
  authStore.updatePassword(form.value);
}
</script>

<template>
  <div
    class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">
          Change Password
        </h2>
      </div>

      <div
        class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg"
      >
        <form
          @submit.prevent="submit"
          class="mt-8 space-y-6"
          novalidate
        >
          <div>
            <label for="current-password" class="form-label required"
              >Current Password</label
            >
            <div class="form-group">
              <input
                v-model="form.current_password"
                type="password"
                name="current_password"
                id="current-password"
                autocomplete="current-password"
                class="form-input"
                placeholder="Current Password"
              />
              <span
                v-if="authStore.errors.current_password"
                class="text-red-500 text-xs ml-1"
                >{{ authStore.errors.current_password[0] }}</span
              >
            </div>
          </div>

          <div>
            <label for="password" class="form-label required"
              >New Password</label
            >
            <div class="form-group">
              <input
                v-model="form.password"
                type="password"
                name="password"
                id="password"
                autocomplete="new-password"
                class="form-input"
                placeholder="New Password"
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
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
