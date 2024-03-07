import { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

// 二级路由
export const rootRoutes: RouteRecordRaw = [
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
]
