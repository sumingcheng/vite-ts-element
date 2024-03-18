import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { userRoutes } from '@/router/user'
import { rootRoutes } from '@/router/root'

const routes: Array<RouteRecordRaw> = [
  ...rootRoutes,
  ...userRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
