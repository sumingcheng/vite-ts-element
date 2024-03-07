import type { AxiosError, AxiosInstance } from 'axios'
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios实例并设置默认配置
const axiosInstance: AxiosInstance = axios.create({
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  baseURL: import.meta.env.VITE_BASE_URL,
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
      ElMessage.warning('请求失败，请稍后重试')
      console.log('请求失败，请稍后重试')
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
