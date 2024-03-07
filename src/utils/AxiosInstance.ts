import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'
import { ElMessage } from "element-plus";


// 定义请求信息的接口
interface RequestInfo {
  timestamp: number // 请求的时间戳
  count: number // 请求的次数
}

// 创建axios实例并设置默认配置
const AxiosInstances: AxiosInstance = axios.create({
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  },
  baseURL: process.env.BASE_URL, // 基础URL
  timeout: 10 * 1000, // 请求超时时间
  withCredentials: false // 是否携带凭证
})

// 存储请求的映射
const requestMap = new Map<string, RequestInfo>()

// 辅助函数：为请求生成唯一键值
const generateRequestKey = (config: AxiosRequestConfig) => {
  return `${ config.url }_${ config.method }`
}

// 请求拦截器
AxiosInstances.interceptors.request.use(
    config => {
      const key = generateRequestKey(config)
      const now = Date.now()

      const info = requestMap.get(key)

      // 如果请求存在，并且在1秒内重复发起
      if (info && now - info.timestamp < 1000) {
        info.count++ // 增加请求次数
        requestMap.set(key, info) // 更新请求信息

        if (info.count > 2) {
          // 如果是第二次或更多次重复请求
          ElMessage.warning('请不要重复请求')
          return Promise.reject('请不要重复请求')
        } else {
          return config
        }
      }

      // 如果请求不存在于映射中
      if (!info) {
        requestMap.set(key, {
          timestamp: now,
          count: 1
        }) // 初始请求次数设置为1

        setTimeout(() => {
          requestMap.delete(key)
        }, 1000)
      }

      return config
    },
    error => Promise.reject(error)
)
// 响应拦截器
AxiosInstances.interceptors.response.use(
    res => {
      // 如果响应没有数据
      if (!res.data) {
        throw new Error('无效的响应数据') // 抛出错误
      }

      return res.data // 返回响应数据
    },
    (error: AxiosError) => {
      // 如果请求超时
      if (error.code === 'ECONNABORTED') {
        ElMessage.warning('请求超时，请稍后重试')
      }

      return Promise.reject(error)
    }
)

export default AxiosInstances
