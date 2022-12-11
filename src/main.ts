import { createApp } from "vue";
import CScrollbar from "c-scrollbar";
import routes from "./router";
import "./style.css";
import App from "./App.vue";

createApp(App).use(CScrollbar).use(routes).mount("#app");
