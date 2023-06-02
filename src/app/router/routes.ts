import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  { path: "/", component: () => import("@/pages/Home.vue") },
  { path: "/create", component: () => import("@/pages/CreateCard.vue") },
];

export default routes;
