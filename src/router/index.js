import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../pages/MainPage.vue";
import AboutView from "../pages/AboutView.vue";

const routes = [
  {
    path: "/",
    component: MainPage,
  },
  {
    path: "/about",
    component: AboutView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
