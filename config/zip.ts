import { createWriteStream, promises as fs } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import archiver from 'archiver'

// 获取当前文件的目录路径
const currentDir = dirname(fileURLToPath(import.meta.url))

// 检查 dist 文件夹是否为空
async function checkDistFolderNotEmpty(directory: string) {
  try {
    const files = await fs.readdir(directory)
    return files.length > 0
  } catch (err) {
    console.error('检查文件夹时出错:', err)
    throw err
  }
}

async function createZipIfDistNotEmpty() {
  const distPath = join(currentDir, '../dist')
  if (await checkDistFolderNotEmpty(distPath)) {
    // 创建一个指向压缩文件的写入流
    const output = createWriteStream(join(distPath, 'dist.zip'))

    // 初始化 archiver 实例，设置压缩级别为最高
    const archive = archiver('zip', {
      zlib: { level: 9 },
    })

    output.on('close', () => {
      console.log(`ZIP文件已成功创建，大小: ${archive.pointer()} 字节`)
    })

    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        console.warn('Archiver 警告: ', err)
      } else {
        throw err
      }
    })

    archive.on('error', (err) => {
      throw err
    })

    // 将输出流绑定到 archive 对象上
    archive.pipe(output)

    // 使用 glob 模式添加文件到归档中，排除 dist.zip 文件
    // 请确保正确设置 cwd 参数为要压缩的文件夹路径，并且忽略 dist.zip 文件
    archive.glob('**/*', {
      cwd: distPath,
      ignore: ['dist.zip'],
    })

    await archive.finalize()
  } else {
    console.log('dist 文件夹为空，不进行打包操作。')
  }
}

createZipIfDistNotEmpty().catch((err) => {
  console.error('创建ZIP文件时出错：', err)
})
