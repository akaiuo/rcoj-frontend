import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import "@/plugins/axios";
import "@/access/index";
import "bytemd/dist/index.css";
import axios from "axios";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import Echarts from 'vue-echarts';
import 'echarts/lib/chart/line';  // 按需引入所需图表类型
import echarts from "echarts";
// import Live2d from "vue-live2d/src/index.vue"

const app = createApp(App)
  .use(ArcoVue)
  .use(store)
  .use(router)
  .use(ArcoVueIcon)
  // .component("vue-live2d", Live2d)
  .component("e-charts", Echarts)
  .mount("#app");
axios.defaults.withCredentials = true;

echarts;