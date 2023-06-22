<script setup>
import { computed, onMounted, ref } from "vue";
import { useParkingStore } from "@/stores/parking";
import ModalParking from "@/components/core/ModalParking.vue";

const parkingStore = useParkingStore();

const form = ref({});

const activeParkings = computed(() => {
  return parkingStore.parkings.filter((parking) => parking.stop_time === "");
});

const completedParkings = computed(() => {
  return parkingStore.parkings.filter((parking) => parking?.completed === true);
});

onMounted(async () => {
  await parkingStore.getParkings();
});
</script>

<template>
  <div
    class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">
          Active Parkings
        </h2>
      </div>

      <div class="flex flex-col gap-2">
        <router-link :to="{ name: 'parkings.create' }" class="btn btn-primary"
          >Order Parking</router-link
        >
      </div>

      <div
        v-for="parking in activeParkings"
        :key="parking.id"
        class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg"
      >
        <form
          @submit.prevent="parkingStore.updateParking(parking.id, form)"
          novalidate
        >
          <div class="flex flex-col p-2 gap-2 mb-2">
            <div>
              <h1 class="text-2xl font-bold">
                {{ parking?.vehicle?.plate_number }}
              </h1>
              <p class="text-sm text-gray-700">{{ parking?.user?.name }}'s car</p>
            </div>

            <div class="bg-gray-100 p-2">
              <p class="text-gray-700">
                {{ parking?.zone?.name }} (${{ parking?.zone?.format_price_per_hour }}
                per hour)
              </p>
            </div>

            <div>
              <h1 class="font-bold uppercase">From</h1>
              <p class="text-gray-700">{{ parking.start_time }}</p>
            </div>

            <div class="flex">
              <h1
                v-if="parking.format_total_price"
                class="text-2xl font-bold text-blue-700"
              >
                ${{ parking.format_total_price }}
              </h1>
            </div>

            <div class="flex justify-end gap-2">
              <button type="submit" class="btn btn-danger">Stop</button>
            </div>
          </div>
        </form>
      </div>

      <div v-if="activeParkings.length === 0 && completedParkings.length === 0" class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden rounded-lg">
        <p class="text-gray-700 text-center">No active parkings.</p>
      </div>

      <ModalParking :completedParkings="completedParkings" :show="!!completedParkings.length" />
    </div>
  </div>
</template>
