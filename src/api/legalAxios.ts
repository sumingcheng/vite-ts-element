import type { AxiosInstance } from 'axios'
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

// 创建axios实例
const legalAxios: AxiosInstance = axios.create({
  baseURL: currentEnvironment(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 100 * 1000,
})

// 响应拦截器
legalAxios.interceptors.response.use(
  (response) => {
    // 如果响应结果存在，则直接返回响应
    return response
  },
  (error) => {
    // 如果响应出现错误，根据错误类型显示不同的错误信息
    if (error.response) {
      const errorMessage: string = error.response.data.message || '请求失败，请稍后重试'
      ElMessage({
        message: errorMessage,
        type: 'error',
      })
    } else {
      ElMessage({
        message: '网络异常或请求超时，请稍后再试',
        type: 'error',
      })
    }

    // 将错误继续向上抛，以便可以在调用时进行更具体的错误处理
    return Promise.reject(error)
  },
)

export default legalAxios
