import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

const app = createApp(App);

const options = {
    // You can set your default options here
};

app.use(pinia);
app.use(router);
app.use(Toast, options);

app.mount("#app");
