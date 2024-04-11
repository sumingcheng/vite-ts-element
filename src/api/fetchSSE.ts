// 请求参数类型
interface RequestParams {
  url: string
  method: string
  data?: any
}

// 通用的请求函数
async function fetchData({ url, method, data }: RequestParams): Promise<Response> {
  const headers = {
    'Content-Type': 'application/json',
  }

  const response = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`网络请求失败: ${response.statusText}`)
  }

  return response
}

// 处理接收到的数据块
function processData(accumulatedData: string, onData: (data: any) => void): string {
  let buffer = accumulatedData // 用于暂存数据
  let startIndex = 0 // 开始搜索的位置

  while (true) {
    const dataIndex = buffer.indexOf('data:', startIndex)
    if (dataIndex === -1) {
      break
    } // 没有找到数据，退出循环

    const endIndex = buffer.indexOf('data:', dataIndex + 5) // 查找下一个"data:"前缀
    const chunk = endIndex === -1 ? buffer.substring(dataIndex) : buffer.substring(dataIndex, endIndex)

    try {
      const obj = JSON.parse(chunk.slice(chunk.indexOf('{'), chunk.lastIndexOf('}') + 1))
      onData(obj) // 处理解析后的数据
    } catch (error) {
      console.error('Chunk JSON解析失败:', error)
    }

    if (endIndex === -1) {
      buffer = '' // 处理完成，清空缓冲
      break
    } else {
      startIndex = endIndex // 更新开始搜索的位置
    }
  }

  return buffer // 返回未处理完的数据缓冲
}

// 处理流结束时剩余的数据块
function processFinalChunk(buffer: string, onDataReceived: (data: any) => void): void {
  if (buffer) {
    try {
      const obj = JSON.parse(buffer.slice(buffer.indexOf('{'), buffer.lastIndexOf('}') + 1))
      onDataReceived(obj)
    } catch (error) {
      console.error('最后一块Chunk JSON解析失败:', error)
    }
  }
}

// 主要的流处理函数
export async function getGeneratedFileData(data: any, onDataReceived: any, onStreamEnd: any) {
  const response = await fetchData({ url: `/legal/v1/process`, method: 'POST', data })

  if (!response.body) {
    throw new Error('响应体中没有可读流数据。')
  }

  let accumulatedChunks = '' // 累积的数据块
  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader()

  while (true) {
    const { done, value } = await reader.read()

    if (value) {
      accumulatedChunks += value // 累积数据
      accumulatedChunks = processData(accumulatedChunks, onDataReceived) // 处理累积的数据
    }

    if (done) {
      processFinalChunk(accumulatedChunks, onDataReceived) // 处理最后的数据块
      onStreamEnd() // 调用结束处理函数
      break
    }
  }
}
