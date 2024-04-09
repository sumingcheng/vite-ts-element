import axiosInstance, { currentEnvironment } from '@/utils/AxiosInstance.ts'

let basePath: string

switch (currentEnvironment()) {
  case '/vnet':
    basePath = '/vnet/v1/download'
    break
  case '/legal':
    basePath = '/legal/v1/download'
    break
  default:
    basePath = ''
}

// 上传文件
export async function uploadFiles(formData: FormData): Promise<any> {
  return axiosInstance({
    method: 'post',
    url: '/v1/uploadfile',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((res) => {
    return res.data
  })
}

// 获取配置
export async function getConfig(data?: any): Promise<any> {
  return axiosInstance({
    method: 'POST',
    url: '/v1/chat-info',
    data,
  }).then((res) => {
    return res.data.data
  })
}

// 获取模型列表
export async function getModelList(data?: any): Promise<any> {
  return axiosInstance({
    method: 'POST',
    url: '/v1/model-list',
    data,
  }).then((res) => {
    return res.data
  })
}

// 下载文件
export async function downloadFile(params: any) {
  const body = JSON.stringify(params)

  try {
    const response = await fetch(basePath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })

    if (!response.ok) {
      throw new Error('网络响应不正常.')
    }
    return await response.blob()
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
