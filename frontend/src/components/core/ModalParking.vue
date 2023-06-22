<script setup>
import { computed, ref, watch } from 'vue';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue';
import { useParkingStore } from "@/stores/parking";

const parkingStore = useParkingStore();

const props = defineProps({
  completedParkings: Array,
  show: {
    type: Boolean,
    default: false,
  },
});

const isOpen = ref(false);

const closeModal = ()  => {
  parkingStore.clearCompletedParkings();
  isOpen.value = false;
}

const parking = computed(() => {
  return props.completedParkings[0] || null;
});

watch(
  () => props.show,
  show => {
    isOpen.value = show;
  },
);
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h1"
                class="text-2xl font-bold leading-6 text-gray-900"
              >
                {{ parking?.vehicle?.plate_number }}
              </DialogTitle>

              <div class="flex flex-col gap-2 mt-2 mb-2">
                <div>
                  <p class="text-sm text-gray-700">{{ parking?.user?.name }}'s car</p>
                </div>

                <div class="bg-gray-100 p-2">
                  <p class="text-gray-700">
                    {{ parking?.zone?.name }} (${{ parking?.zone?.format_price_per_hour }} per hour)
                  </p>
                </div>

                <div>
                  <h1 class="font-bold uppercase">From</h1>
                  <p class="text-gray-700">{{ parking?.start_time }}</p>
                </div>

                <div>
                  <h1 class="font-bold uppercase">To</h1>
                  <p class="text-gray-700">{{ parking?.stop_time }}</p>
                </div>

                <div class="flex">
                  <h1 class="text-2xl font-bold text-blue-700">
                    ${{ parking?.format_total_price }}
                  </h1>
                </div>

                <div class="flex justify-end gap-2">
                  <button @click="closeModal" type="button" class="btn btn-danger">Close</button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
