import type { AxiosError, AxiosInstance } from 'axios'
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 获取当前环境函数
console.log('当前环境', import.meta.env.MODE)

export function currentEnvironment() {
  switch (import.meta.env.MODE) {
    case 'intranet':
      return '/vnet'
    case 'development':
      return '/legal'
      // case 'legal':
      // 	return ''
    default:
      return ''
  }
}

// 创建axios实例并设置默认配置
const axiosInstance: AxiosInstance = axios.create({
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  baseURL: currentEnvironment(),
  timeout: 10 * 1000,
  withCredentials: false,
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: any): any => {
    // 修改config或执行其他操作
    return config
  },
  error => Promise.reject(error),
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    if (!response.data) {
      throw new Error('无效的响应数据')
    }
    return response.data
  },
  (error: AxiosError) => {
    if (error.code === 'ECONNABORTED') {
      ElMessage.warning('请求超时，请稍后重试')
    }

    // 其他错误处理
    return Promise.reject(error)
  },
)

export default axiosInstance
