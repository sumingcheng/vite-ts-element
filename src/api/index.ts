import AxiosInstance from '@/lib/AxiosInstance.ts'

export async function getData(): Promise<any> {
  const data = await AxiosInstance({
    url: 'todos/1',
    method: 'get',
  })
  return data.data
}
