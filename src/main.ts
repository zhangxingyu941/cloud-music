import { createApp } from "vue";
import store from "./store/index";
import routes from "./router";
import CScrollbar from "c-scrollbar";
import { ElNotification } from "element-plus";
import "./style.css";
import App from "./App.vue";
import "element-plus/dist/index.css";

const app = createApp(App);
app.config.globalProperties.$notify = ElNotification;
app.use(store);
app.use(CScrollbar).use(routes).mount("#app");
