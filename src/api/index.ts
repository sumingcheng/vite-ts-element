import AxiosInstance from '@/lib/AxiosInstance.ts'

export async function getData(): Promise<any> {
  const data = await AxiosInstance({
    url: 'todos/1',
    method: 'get',
  })
  return data.data
}

// 语音转文字
export async function getVoiceToText(data: any): Promise<any> {
  const res = await AxiosInstance({
    baseURL: 'http://120.133.63.166:8117',
    url: '/v1/audio/transcriptions',
    method: 'get',
    data,
  })
  return res.data
}

// 文字转语音
export async function getTextToVoice(data: any): Promise<any> {
  const res = await AxiosInstance({
    baseURL: 'http://120.133.63.166:8117',
    url: '/v1/audio/speech',
    method: 'get',
    data,
  })
  return res.data
}

// Fastgpt API
export async function getFastGptAnswer(data: any): Promise<any> {
  const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': 'Bearer fastgpt-FcTniGhdW5GJiHpD4dkkUUUFQP7NCNiXMW64WqI1r3PSTkfJ57tsUV5nV6jnXPb0',
  }
  return AxiosInstance({
    url: 'http://59.151.19.117:3000/api/v1/chat/completions',
    method: 'post',
    data,
    headers,
  }).then((res) => {
    return res.data ? res.data : []
  })
}
