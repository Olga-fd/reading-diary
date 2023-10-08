import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../pages/MainPage.vue";
import AboutView from "../pages/AboutView.vue";

const routes = [
  {
    path: "/",
    component: MainPage,
  },
  {
    path: "/about/:id",
    component: AboutView,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
