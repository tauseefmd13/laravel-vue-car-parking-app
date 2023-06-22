<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const form = ref({
  name: "",
  email: "",
});

const submit = () => {
  authStore.updateUser(form.value);
}

onMounted(async () => {
  await authStore.getUser();
  form.value.name = authStore.user?.name;
  form.value.email = authStore.user?.email;
});
</script>

<template>
  <div
    class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">
          Profile Information
        </h2>
      </div>

      <div
        class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg"
      >
        <form @submit.prevent="submit" class="mt-8 space-y-6" novalidate>
          <div>
            <label for="name" class="form-label required">Name</label>
            <div class="form-group">
              <input
                v-model="form.name"
                type="text"
                name="name"
                id="name"
                autocomplete="name"
                class="form-input"
                placeholder="Name"
              />
              <span
                v-if="authStore.errors.name"
                class="text-red-500 text-xs ml-1"
                >{{ authStore.errors.name[0] }}</span
              >
            </div>
          </div>

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
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
