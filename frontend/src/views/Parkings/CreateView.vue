<script setup>
import { onMounted, ref } from "vue";
import { useParkingStore } from "@/stores/parking";
import { useVehicleStore } from "@/stores/vehicle";
import { useZoneStore } from "@/stores/zone";

const parkingStore = useParkingStore();
const vehicleStore = useVehicleStore();
const zoneStore = useZoneStore();

const form = ref({
  vehicle_id: "",
  zone_id: "",
});

const submit = () => {
  parkingStore.storeParking(form.value);
};

onMounted(async () => {
  await Promise.all([
    vehicleStore.getVehicles(),
    zoneStore.getZones()
  ]);
});
</script>

<template>
  <div
    class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">
          Order Parking
        </h2>
      </div>

      <div
        class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg"
      >
        <form @submit.prevent="submit" class="mt-8 space-y-6" novalidate>
          <div>
            <label for="vehicle_id" class="form-label required">Vehicle</label>
            <div class="form-group">
              <select
                v-model="form.vehicle_id"
                id="vehicle_id"
                name="vehicle_id"
                class="form-input"
                required
              >
                <option value="">--Select--</option>
                <option
                  v-for="item in vehicleStore.items"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.plate_number }}
                </option>
              </select>
              <span
                v-if="parkingStore.errors.vehicle_id"
                class="text-red-500 text-xs ml-1"
                >{{ parkingStore.errors.vehicle_id[0] }}</span
              >
            </div>
          </div>

          <div>
            <label for="zone_id" class="form-label required">Zone</label>
            <div class="form-group">
              <select
                v-model="form.zone_id"
                id="zone_id"
                name="zone_id"
                class="form-input"
                required
              >
                <option value="">--Select--</option>
                <option
                  v-for="item in zoneStore.items"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }} (${{ item.format_price_per_hour }} per hour)
                </option>
              </select>
              <span
                v-if="parkingStore.errors.zone_id"
                class="text-red-500 text-xs ml-1"
                >{{ parkingStore.errors.zone_id[0] }}</span
              >
            </div>
          </div>

          <div class="flex justify-between gap-2">
            <router-link
              :to="{ name: 'parkings.index' }"
              class="btn btn-secondary"
              >Cancel</router-link
            >
            <button type="submit" class="btn btn-primary w-full">
              Start Parking
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
