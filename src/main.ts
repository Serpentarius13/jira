import { createApp } from "vue";
import "@/app/styles/main.scss";
import App from "./app/App.vue";

import { createPinia } from "pinia";
import router from "./app/router/router";

import VueClickAway from "vue3-click-away";

import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);

app.use(router);

app.use(VueClickAway);

app.use(Toast, {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 2000,
});

app.mount("#app");
