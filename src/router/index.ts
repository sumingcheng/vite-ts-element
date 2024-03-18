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
  // 刷新时，滚动条位置还原
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { top: 0 }
  //   }
  // },
})

export default router
