// src/utils/dayjsUtil.ts
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

// 导入中文语言包
import relativeTime from 'dayjs/plugin/relativeTime'

// 相对时间插件
import utc from 'dayjs/plugin/utc'

// UTC 插件
import timezone from 'dayjs/plugin/timezone'

// 时区插件

// 扩展 dayjs 插件
dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

// 设置默认语言为中文
dayjs.locale('zh-cn')
// 由于 dayjs 插件可能没有包含 TypeScript 类型，这里手动设置时区
dayjs.tz.setDefault('Asia/Shanghai')

// 中国时间格式
const CHINA_FORMAT = 'YYYY-MM-DD HH:mm:ss'

// 格式化日期时间
export const formatDate = (date: dayjs.ConfigType, format: string = CHINA_FORMAT): string => dayjs(date).format(format)

// 从现在到给定日期的相对时间（例如：3小时前）
export const fromNow = (date: dayjs.ConfigType): string => dayjs(date).fromNow()

// 获取当前日期时间
export const now = (format: string = CHINA_FORMAT): string => dayjs().format(format)

// 转换为中国时区的日期时间
export const toCST = (date: dayjs.ConfigType, format: string = CHINA_FORMAT): string => dayjs(date).tz('Asia/Shanghai').format(format)

// 解析 UTC 时间
export const parseUTC = (date: dayjs.ConfigType, format: string = CHINA_FORMAT): string => dayjs.utc(date).format(format)
