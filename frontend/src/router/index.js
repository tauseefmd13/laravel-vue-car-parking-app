import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const routes = [
  {
    path: "/",
    component: () => import("@/components/AppLayout.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/HomeView.vue"),
      },
      {
        path: "/parkings",
        name: "parkings.index",
        component: () => import("@/views/Parkings/IndexView.vue"),
      },
      {
        path: "/parkings/create",
        name: "parkings.create",
        component: () => import("@/views/Parkings/CreateView.vue"),
      },
      {
        path: "/vehicles",
        name: "vehicles.index",
        component: () => import("@/views/Vehicles/IndexView.vue"),
      },
      {
        path: "/vehicles/create",
        name: "vehicles.create",
        component: () => import("@/views/Vehicles/CreateView.vue"),
      },
      {
        path: "/vehicles/:id/edit",
        name: "vehicles.edit",
        component: () => import("@/views/Vehicles/EditView.vue"),
      },
      {
        path: "/history",
        name: "history.index",
        component: () => import("@/views/History/IndexView.vue"),
      },
      {
        path: "/history/:id",
        name: "history.show",
        component: () => import("@/views/History/ShowView.vue"),
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("@/views/Profile/UpdateProfileView.vue"),
      },
      {
        path: "/change-password",
        name: "change-password",
        component: () => import("@/views/Profile/UpdatePasswordView.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/components/GuestLayout.vue"),
    meta: {
      requiresGuest: true,
    },
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("@/views/Auth/LoginView.vue"),
      },
      {
        path: "/register",
        name: "register",
        component: () => import("@/views/Auth/RegisterView.vue"),
      },
      {
        path: "/forgot-password",
        name: "forgot-password",
        component: () => import("@/views/Auth/ForgotPasswordView.vue"),
      },
      {
        path: "/reset-password/:token",
        name: "reset-password",
        component: () => import("@/views/Auth/ResetPasswordView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeResolve(async (to, from, next) => {
  const authStore = useAuthStore();
  if (!authStore.user) {
    await authStore.getUser();
  }
  authStore.authErrors = [];
  // console.log("authStore:", authStore.user);
  // console.log("requiresAuth:", to.meta.requiresAuth);
  // console.log("requiresGuest:", to.meta.requiresGuest);

  if (to.meta.requiresAuth && !authStore.user) {
    next({ name: "login" });
  } else if (to.meta.requiresGuest && authStore.user) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
