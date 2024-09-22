import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/routes";
import axios from "axios";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
