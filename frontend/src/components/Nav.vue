<script setup>

</script>

<template>
    <nav class="flex gap-4 justify-between">
        <div class="flex gap-4 items-center">
            <router-link :to="{ name: 'home' }">
                <h2 class="text-xl font-bold">
                    <div
                    class="inline-flex items-center justify-center bg-blue-600 w-6 h-6 text-center text-white rounded"
                    >
                    P
                    </div>
                    myParking
                </h2>
            </router-link>

            <router-link :to="{ name: 'parkings.index' }" class="router-link">
                Parkings
            </router-link>

            <router-link :to="{ name: 'vehicles.index' }" class="router-link">
                Vehicles
            </router-link>

            <router-link :to="{ name: 'history.index' }" class="router-link">
                History
            </router-link>
        </div>
        <div class="flex gap-4 items-center">
            <router-link :to="{ name: 'profile' }" class="router-link">
                Profile
            </router-link>

            <router-link :to="{ name: 'change-password' }" class="router-link">
                Change Password
            </router-link>

            <router-link :to="{ name: 'login' }" class="router-link">
                Login
            </router-link>

            <router-link :to="{ name: 'register' }" class="router-link">
                Register
            </router-link>
        </div>
    </nav>
</template>