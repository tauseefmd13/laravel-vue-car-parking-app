<script setup>
import { onMounted } from "vue";
import { useVehicleStore } from "@/stores/vehicle";

const vehicleStore = useVehicleStore();

onMounted(async () => {
  await vehicleStore.getVehicles();
});
</script>

<template>
  <div
    class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
  >
    <div class="w-full space-y-8">
      <div class="flex items-center justify-between">
        <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">
          Vehicles
        </h2>
        <router-link
          :to="{ name: 'vehicles.create' }"
          class="hover:bg-indigo-400 group flex items-center rounded-md bg-indigo-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
        >
          <svg
            width="20"
            height="20"
            fill="currentColor"
            class="mr-2"
            aria-hidden="true"
          >
            <path
              d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z"
            />
          </svg>
          New
        </router-link>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">License Plate</th>
              <th scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="vehicle in vehicleStore.vehicles"
              :key="vehicle.id"
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
            >
              <td class="px-6 py-4">{{ vehicle.plate_number }}</td>
              <td class="px-6 py-4">
                <router-link
                  :to="{name: 'vehicles.edit', params: { id: vehicle.id }}"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >Edit</router-link
                >
              </td>
            </tr>
            <tr v-if="vehicleStore.vehicles.length === 0">
              <td class="px-6 py-4" colspan="2">No records found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
