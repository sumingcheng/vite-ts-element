import qs from 'qs'

/**
 * 解析查询字符串为对象
 * @param query 查询字符串，例如 '?key=value&key2=value2'
 * @returns 解析后的对象，例如 { key: 'value', key2: 'value2' }
 */
export function parseQuery(query: string) {
  // `ignoreQueryPrefix: true` 选项表示忽略查询字符串开头的问号 '?'
  return qs.parse(query, { ignoreQueryPrefix: true })
}

/**
 * 将对象字符串化为查询字符串
 * @param obj 要字符串化的对象，例如 { key: 'value', key2: ['value2', 'value3'] }
 * @returns 字符串化后的查询字符串，例如 'key=value&key2[]=value2&key2[]=value3'
 */
export function stringifyObject(obj: Record<string, any>) {
  return qs.stringify(obj, { arrayFormat: 'brackets' })
}
