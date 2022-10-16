import { createApp } from "vue";
import router from "@/router/index.js";
import App from "./App.vue";
import components from "./components/UI";
import "./assets/main.css";
const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

app.use(router).mount("#app");
