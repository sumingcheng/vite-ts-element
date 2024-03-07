import { createRouter, createWebHistory } from 'vue-router';
import { userRoutes } from "@/router/user.ts";
import Layout from '@/layout/index.vue';
// 一级路由
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/index/index.vue'),
      },
    ],
  },
  ...userRoutes
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
