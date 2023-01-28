import { createApp } from "vue";
import router from "@/router/index.js";
import store from "./store";
import App from "./App.vue";
import components from "./components/UI";
import "./assets/styles/main.css";
const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

app.use(router).use(store).mount("#app");
