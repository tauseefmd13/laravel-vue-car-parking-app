<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useVehicleStore } from "@/stores/vehicle";

const route = useRoute();
const vehicleStore = useVehicleStore();

const form = ref({
  plate_number: "",
});

const submit = () => {
  vehicleStore.updateVehicle(route.params.id, form.value);
}

onMounted(async () => {
  await vehicleStore.getVehicle(route.params.id);
  form.value.plate_number = vehicleStore.vehicle?.plate_number;
});
</script>

<template>
  <div
    class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">
          Edit Vehicle
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
            <label for="plate_number" class="form-label required"
              >License Plate</label
            >
            <div class="form-group">
              <input
                v-model="form.plate_number"
                type="text"
                name="plate_number"
                id="plate_number"
                class="form-input"
                placeholder="License Plate"
              />
              <span
                v-if="vehicleStore.errors.plate_number"
                class="text-red-500 text-xs ml-1"
                >{{ vehicleStore.errors.plate_number[0] }}</span
              >
            </div>
          </div>

          <div class="flex justify-between gap-2">
            <router-link
              :to="{ name: 'vehicles.index' }"
              class="btn btn-secondary"
              >Cancel</router-link
            >
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
