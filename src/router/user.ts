import type { RouteRecordRaw } from 'vue-router'

export const userRoutes: RouteRecordRaw[] = [
  {
    path: '/user',
    // component: Login,
    children: [
      {
        path: 'login',
        component: () => import('@/views/user/index.vue'),
      },
    ],
  },
]
