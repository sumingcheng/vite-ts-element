// 过程数据
function processData(accumulatedData: string, onData: (data: any) => void): string {
  const newData = accumulatedData
  let buffer = '' // 用于暂存当前处理中或不完整的数据块
  let startIndex = 0 // 搜索起始位置

  while (true) {
    const dataIndex = newData.indexOf('data:', startIndex)
    if (dataIndex === -1) {
      buffer = newData.substring(startIndex)
      break
    }

    if (buffer !== '') {
      try {
        const obj = JSON.parse(buffer)
        console.log('之前不完整的Chunk JSON解析成功:', obj)
        onData(obj)
        buffer = '' // 清空缓冲区
      } catch (error) {
        console.error('之前不完整的Chunk JSON解析失败，等待更多数据:', error)
      }
    }

    const endIndex = newData.indexOf('data:', dataIndex + 1) // 查找下一个"data:"前缀，作为当前数据块的结束
    if (endIndex === -1) {
      buffer = newData.substring(dataIndex) // 将当前数据块存入缓冲区
      break // 退出循环，等待更多数据
    }

    const completeData = newData.substring(dataIndex, endIndex)
    try {
      const obj = JSON.parse(completeData.slice(completeData.indexOf('{'), completeData.lastIndexOf('}') + 1))
      console.log('Chunk JSON解析成功:', obj)
      onData(obj)
    } catch (error) {
      console.error('Chunk JSON解析失败:', error)
    }

    startIndex = endIndex
  }

  return buffer
}

function processFinalChunk(buffer: string, onDataReceived: (data: any) => void): void {
  if (buffer !== '') {
    try {
      // 尝试从缓冲区中解析最后一个数据块
      const obj = JSON.parse(buffer.slice(buffer.indexOf('{'), buffer.lastIndexOf('}') + 1))
      console.log('最后一块Chunk JSON解析成功:', obj)
      onDataReceived(obj)
    } catch (error) {
      console.error('最后一块Chunk JSON解析失败:', error)
    }
  }
}

export async function getGeneratedFileData(data: any, onDataReceived: any, onStreamEnd: any) {
  if (data.tpl_name === '请选择模板文件') {
    data.tpl_name = ''
  }

  const response = await fetch(`/legal/v1/process`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.body) {
    throw new Error('响应体中没有可读流数据。')
  }

  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader()
  let accumulatedChunks = '' // 累积片段的字符串

  while (true) {
    const { done, value } = await reader.read()
    console.log('原始数据:', value)

    if (value) {
      accumulatedChunks += value // 将新的片段追加到累积字符串中
      accumulatedChunks = processData(accumulatedChunks, onDataReceived)
    }

    if (done) {
      processFinalChunk(accumulatedChunks, onDataReceived) // 在流结束时处理最后一块数据
      onStreamEnd() // 调用流结束时的处理函数
      break
    }
  }
}
