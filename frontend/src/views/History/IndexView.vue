<script setup>
import { onMounted, ref } from "vue";
import { useParkingStore } from "@/stores/parking";

const parkingStore = useParkingStore();

const page = ref(1);

onMounted(async () => {
  await parkingStore.getParkings();
});

window.addEventListener('scroll', async () => {
  let bottomOfWindow = document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight;
  if (bottomOfWindow && parkingStore.parkings.length < parkingStore.meta?.total) {
    page.value++;
    await parkingStore.getNextParkings(page.value);
  }
});
</script>

<template>
  <div
    class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">
          Parking History
        </h2>
      </div>

      <div
        v-for="parking in parkingStore.parkings"
        :key="parking.id"
        class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg"
      >
        <div class="flex flex-col p-2 gap-2 mb-2">
          <div>
            <h1 class="text-2xl font-bold">{{ parking?.vehicle?.plate_number }}</h1>
          </div>

          <div class="bg-gray-100 p-2">
            <p class="text-gray-700">{{ parking?.zone?.name }} (${{ parking?.zone?.format_price_per_hour }}
                per hour)</p>
          </div>

          <div>
            <h1 class="font-bold uppercase">From</h1>
            <p class="text-gray-700">{{ parking.start_time }}</p>
          </div>

          <div>
            <h1 class="font-bold uppercase">To</h1>
            <p class="text-gray-700">{{ parking.stop_time }}</p>
          </div>

          <div class="flex justify-end">
            <h1 class="text-2xl font-bold">${{ parking.format_total_price }}</h1>
          </div>

          <div class="flex flex-col gap-2">
            <router-link
              :to="{ name: 'history.show', params: { id: parking.id } }"
              class="btn btn-secondary"
              >View Details</router-link
            >
          </div>
        </div>
      </div>

      <div v-if="parkingStore.loading" class="text-gray-700 text-center">
        <span>Loading...</span>
      </div>

      <div v-if="parkingStore.parkings.length === 0" class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
        <p class="text-gray-700 text-center">No records found.</p>
      </div>
    </div>
  </div>
</template>
