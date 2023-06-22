<script setup>
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <div class="min-h-full">
    <Navbar />
    <main>
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <router-view />
      </div>
    </main>
  </div>
</template>
