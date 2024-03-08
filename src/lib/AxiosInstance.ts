import type { AxiosInstance } from 'axios'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import cookies from '@/lib/Cookies.ts'

const commonHeaders = {
  'Content-Type': 'application/json;charset=UTF-8',
}

const axiosInstance: AxiosInstance = axios.create({
  headers: commonHeaders,
  baseURL: import.meta.env.DEV ? '/api' : import.meta.env.VITE_BASE_URL,
  timeout: 100 * 1000,
  withCredentials: false,
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    const userToken = cookies.get('token')
    if (userToken) {
      config.headers.Authorization = `${userToken}`
    }
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

    return response
  },

  (error) => {
    const { response } = error

    // 检查是否为取消请求的特定错误
    if (error && error.constructor.name === 'Cancel') {
      return Promise.reject(error)
    }

    // 响应存在的处理逻辑
    if (response) {
      const message = response.data.message || 'error' // 默认错误消息
      let redirectToLogin = false // 是否重定向到登录

      if (response.status === 403) {
        redirectToLogin = true // 403错误时重定向到登录
      }

      // 显示错误消息
      ElMessage({
        showClose: true,
        message,
        type: 'error',
        duration: 5 * 1000,
      })

      // 如果需要重定向到登录页面
      if (redirectToLogin) {
        try {
          window.parent.location.href = '/#/portal/login.html'
        } catch {
          window.location.href = '/#/portal/login.html'
        }
      } else {
        return Promise.reject(response)
      }
    } else {
      // 响应不存在的处理逻辑
      ElMessage({
        showClose: true,
        message: '请求超时，请稍后再试',
        type: 'error',
        duration: 5 * 1000,
      })
      return Promise.reject(error)
    }
  },

)

export default axiosInstance
