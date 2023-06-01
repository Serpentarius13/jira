import { createApp } from "vue";
import "@/app/styles/main.scss";
import App from "./app/App.vue";

import { createPinia } from "pinia";
import router from "./app/router/router";

import VueClickAway from "vue3-click-away";

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);

app.use(router);

app.use(VueClickAway);

app.mount("#app");
