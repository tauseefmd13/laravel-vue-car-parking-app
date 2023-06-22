<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const userNavigation = [
  { name: "Profile", href: "profile" },
  { name: "Change Password", href: "change-password" },
  // { name: "Log out", href: "login" },
];
</script>

<template>
  <Disclosure as="nav" class="bg-white" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <router-link :to="{ name: 'home' }">
              <h2 class="text-xl font-bold">
                <span
                  class="inline-flex items-center justify-center bg-blue-600 w-6 h-6 text-center text-white rounded"
                  >P</span
                >
                <span>myParking</span>
              </h2>
            </router-link>
          </div>
          <div v-if="authStore.user" class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
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
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <!-- Profile dropdown -->
            <Menu v-if="authStore.user" as="div" class="relative ml-3">
              <div>
                <MenuButton
                  class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    :src="authStore.user.avatar"
                    alt=""
                  />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem
                    v-for="item in userNavigation"
                    :key="item.name"
                    v-slot="{ active }"
                  >
                    <router-link
                      :to="{ name: item.href }"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      >{{ item.name }}</router-link
                    >
                  </MenuItem>
                  <MenuItem
                    @click="authStore.handleLogout"
                    as="button"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Log out
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
            <div v-else>
              <router-link :to="{ name: 'login' }" class="router-link">
                Login
              </router-link>

              <router-link :to="{ name: 'register' }" class="router-link">
                Register
              </router-link>
            </div>
          </div>
        </div>
        <div class="-mr-2 flex md:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="inline-flex items-center justify-center rounded-md bg-gray-300 p-2 text-gray-400 hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="md:hidden">
      <div v-if="authStore.user" class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
        <DisclosureButton
          as="a"
          :class="[
            active
              ? 'bg-gray-900 text-white'
              : 'text-gray-500 hover:bg-gray-700 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium',
          ]"
        >
          <router-link :to="{ name: 'parkings.index' }"> Parkings </router-link>
        </DisclosureButton>
        <DisclosureButton
          as="a"
          :class="[
            active
              ? 'bg-gray-900 text-white'
              : 'text-gray-500 hover:bg-gray-700 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium',
          ]"
        >
          <router-link :to="{ name: 'vehicles.index' }"> Vehicles </router-link>
        </DisclosureButton>
        <DisclosureButton
          as="a"
          :class="[
            active
              ? 'bg-gray-900 text-white'
              : 'text-gray-500 hover:bg-gray-700 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium',
          ]"
        >
          <router-link :to="{ name: 'history.index' }"> History </router-link>
        </DisclosureButton>
      </div>
      <div class="border-t border-gray-700 pt-4 pb-3">
        <template v-if="authStore.user">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img
                class="h-10 w-10 rounded-full"
                :src="authStore.user.avatar"
                alt=""
              />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">
                {{ authStore.user.name }}
              </div>
              <div class="text-sm font-medium leading-none text-gray-400">
                {{ authStore.user.email }}
              </div>
            </div>
          </div>
          <div class="mt-3 space-y-1 px-2">
            <DisclosureButton
              v-for="item in userNavigation"
              :key="item.name"
              as="a"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-700 hover:text-white"
            >
              <router-link :to="{ name: item.href }">{{ item.name }}</router-link>
            </DisclosureButton>
            <DisclosureButton
              @click="authStore.handleLogout"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-700 hover:text-white"
            >
              Log out
            </DisclosureButton>
          </div>
        </template>
        <template v-else>
          <div class="space-y-1 px-2">
            <DisclosureButton
              as="a"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-700 hover:text-white"
            >
              <router-link :to="{ name: 'login' }">Login</router-link>
            </DisclosureButton>
            <DisclosureButton
              as="a"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-700 hover:text-white"
            >
              <router-link :to="{ name: 'register' }">Register</router-link>
            </DisclosureButton>
          </div>
        </template>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>
