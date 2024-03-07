import { createRouter, createWebHistory } from 'vue-router';
import { userRoutes } from "@/router/user.ts";
import { rootRoutes } from "@/router/root.ts";

const routes = [
  ...rootRoutes,
  ...userRoutes
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
