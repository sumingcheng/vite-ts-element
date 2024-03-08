import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

export const rootRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    meta: {
      title: '万物大模型',
      keywords: '世纪互联, 大模型',
      description: '万物大模型',
    },
    children: [
      {
        path: '',
        component: () => import('@/views/index/index.vue'),
      },
    ],
  },
]
