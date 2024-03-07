import { RouteRecordRaw } from "vue-router";

// 二级路由
export const userRoutes: RouteRecordRaw = [
  {
    path: '/user',
    // component: Login,
    children: [
      {
        path: 'login',
        component: () => import('@/views/user/index.vue')
      }
    ]
  },
]
