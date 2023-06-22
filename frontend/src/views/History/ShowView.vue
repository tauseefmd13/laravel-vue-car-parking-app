<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useParkingStore } from "@/stores/parking";

const route = useRoute();
const parkingStore = useParkingStore();

onMounted(async () => {
  await parkingStore.getParking(route.params.id);
});
</script>

<template>
  <div
    class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">
          Parking History Details
        </h2>
      </div>

      <div
        v-if="parkingStore.parking"
        class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg"
      >
        <div class="flex flex-col p-2 gap-2 mb-2">
          <h1 class="font-bold uppercase mb-2">
            Parking Order #{{ parkingStore.parking.id }}
          </h1>

          <div>
            <h1 class="font-bold uppercase">License Plate</h1>
            <h1 class="text-2xl font-bold">
              {{ parkingStore.parking?.vehicle?.plate_number }}
            </h1>
          </div>

          <div>
            <h1 class="font-bold uppercase">Description</h1>
            <p class="text-gray-700">
              {{ parkingStore.parking?.user?.name }}'s car
            </p>
          </div>

          <div>
            <h1 class="font-bold uppercase">Zone</h1>
            <p class="text-gray-700">{{ parkingStore.parking?.zone?.name }}</p>
          </div>

          <div>
            <h1 class="font-bold uppercase">Price</h1>
            <p class="text-gray-700">
              ${{ parkingStore.parking?.zone?.format_price_per_hour }} per hour
            </p>
          </div>

          <div>
            <h1 class="font-bold uppercase">From</h1>
            <p class="text-gray-700">{{ parkingStore.parking.start_time }}</p>
          </div>

          <div>
            <h1 class="font-bold uppercase">To</h1>
            <p class="text-gray-700">{{ parkingStore.parking.stop_time }}</p>
          </div>

          <div>
            <h1 class="font-bold uppercase">Total</h1>
            <p class="text-gray-700">
              ${{ parkingStore.parking.format_total_price }}
            </p>
          </div>

          <div class="flex flex-col gap-2">
            <router-link
              :to="{ name: 'history.index' }"
              class="btn btn-secondary"
              >Return</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
