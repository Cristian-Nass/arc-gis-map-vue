import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Map from "../views/Map.vue";
import UppsalaMap from "../views/UppsalaMap.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/map",
    name: "Map",
    component: Map,
  },
  {
    path: "/uppsala-map",
    name: "UppsalaMap",
    component: UppsalaMap,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
