import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AdminView from "@/views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import AboutView from "@/views/AboutView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "主页",
    component: HomeView,
    meta: {
      visibleHead: true,
    },
  },
  {
    path: "/about",
    name: "题库",
    component: AboutView,
    meta: {
      visibleHead: true,
    },
  },
  {
    path: "/noAuth",
    component: NoAuthView,
  },
  {
    path: "/admin",
    name: "管理",
    component: AdminView,
    meta: {
      access: "admin",
      visibleHead: true,
    },
  },
];
