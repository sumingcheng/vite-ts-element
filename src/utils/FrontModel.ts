import 'reflect-metadata'
import _ from 'lodash'

// 定义数据属性类型的枚举
enum ServerPropertyType {
  NORMAL = 'normal',
  ARRAY = 'array',
  OBJECT = 'object'
}

// 请求数据类型
export class RequestDataBaseType {
  [key: string]: string | number | object | boolean
}

// 定义绑定的属性接口
export interface IHttpBindNormal {
  serverPropertyTypeName: ServerPropertyType
  serverPropertyPath: string
  propertyName: string
  createItemFunction?: string
}

// 普通属性绑定函数
export const HttpBindNormal = (serverPropertyPath?: string) => {
  return defineMetadataForBinding(ServerPropertyType.NORMAL, serverPropertyPath)
}

// 数组属性绑定函数
export const HttpBindArray = (serverPropertyPath: string, createItemFunction?: string) => {
  return defineMetadataForBinding(ServerPropertyType.ARRAY, serverPropertyPath, createItemFunction)
}

// 对象属性绑定函数
export const HttpBindObject = (serverPropertyPath: string, createItemFunction?: string) => {
  return defineMetadataForBinding(ServerPropertyType.OBJECT, serverPropertyPath, createItemFunction)
}

// 辅助函数：为属性定义元数据，减少重复代码
const defineMetadataForBinding = (
  serverPropertyTypeName: ServerPropertyType,
  serverPropertyPath?: string,
  createItemFunction?: string
) => {
  return (target: object, propertyName: string) => {
    const metaValue: IHttpBindNormal = {
      serverPropertyTypeName,
      serverPropertyPath: serverPropertyPath || propertyName,
      propertyName,
      createItemFunction
    }
    Reflect.defineMetadata(propertyName, metaValue, target) // 使用元数据API定义属性
  }
}

// 定义前端模型的抽象类
export abstract class FrontModel {
  // 请求前的处理函数，子类可以重写
  beforeGetRequestBody() {}

  // 响应后的处理函数，子类可以重写
  afterInitFromResponse() {}

  // 从响应初始化数据
  initFromResponse(res: object) {
    const metadataKeys: Array<string> = Reflect.getMetadataKeys(this)
    metadataKeys.forEach((metadataKey: string) => {
      const metadataValue: IHttpBindNormal = Reflect.getMetadata(metadataKey, this)
      this.handleResponseDataByType(metadataValue, res)
    })
    this.afterInitFromResponse()
  }

  // 根据类型处理响应数据
  private handleResponseDataByType(metadataValue: IHttpBindNormal, res: object) {
    const resValue = _.get(res, metadataValue.serverPropertyPath)
    switch (metadataValue.serverPropertyTypeName) {
      case ServerPropertyType.NORMAL:
        if (resValue) {
          _.set(this, metadataValue.propertyName, resValue)
        }
        break
      case ServerPropertyType.ARRAY:
        this.handleArrayResponse(metadataValue, resValue)
        break
      case ServerPropertyType.OBJECT:
        this.handleObjectResponse(metadataValue, resValue)
        break
    }
  }

  // 处理数组类型的响应数据
  private handleArrayResponse(metadataValue: IHttpBindNormal, resValue: any) {
    if (Array.isArray(resValue) && metadataValue.createItemFunction) {
      const createItemFunction = _.get(this, metadataValue.createItemFunction)
      const data = _.get(this, metadataValue.propertyName)
      if (typeof createItemFunction === 'function' && Array.isArray(data)) {
        resValue.forEach((resItem: object) => {
          const item = createItemFunction()
          item.initFromResponse(resItem)
          data.push(item)
        })
      }
    }
  }

  // 处理对象类型的响应数据
  private handleObjectResponse(metadataValue: IHttpBindNormal, resValue: any) {
    if (resValue && metadataValue.createItemFunction) {
      const createItemFunction = _.get(this, metadataValue.createItemFunction)
      if (typeof createItemFunction === 'function') {
        const item = createItemFunction()
        item.initFromResponse(resValue)
        _.set(this, metadataValue.propertyName, item)
      }
    }
  }

  // 获取请求体
  getRequestBody(): RequestDataBaseType {
    const metadataKeys: Array<string> = Reflect.getMetadataKeys(this)
    const requestBody = new RequestDataBaseType()
    metadataKeys.forEach((metadataKey: string) => {
      const metadataValue: IHttpBindNormal = Reflect.getMetadata(metadataKey, this)
      const propertyValue = _.get(this, metadataValue.propertyName)
      switch (metadataValue.serverPropertyTypeName) {
        case ServerPropertyType.NORMAL:
          _.set(requestBody, metadataValue.serverPropertyPath, propertyValue)
          break
        case ServerPropertyType.ARRAY:
          if (Array.isArray(propertyValue)) {
            _.set(
              requestBody,
              metadataValue.serverPropertyPath,
              propertyValue.map(item => item.getRequestBody())
            )
          }
          break
        case ServerPropertyType.OBJECT:
          if (propertyValue) {
            _.set(requestBody, metadataValue.serverPropertyPath, propertyValue.getRequestBody())
          }
          break
      }
    })
    return requestBody
  }

  // 执行浅拷贝
  shallowCopyFromSelf<T extends FrontModel>(target: T): T {
    Object.assign(target, this)
    return target
  }
}

// 定义模型项类，继承自前端模型类
export class FrontModelItem extends FrontModel {
  uniqueIndex: symbol

  constructor() {
    super()
    this.uniqueIndex = Symbol() // 创建唯一索引
  }

  // 判断是否为相同的项
  isSameItem(item: FrontModelItem | undefined): boolean {
    return item ? item.uniqueIndex === this.uniqueIndex : false
  }

  // 判断是否不是相同的项
  isNotSameItem(item: FrontModelItem | undefined): boolean {
    return !this.isSameItem(item)
  }

  // 刷新唯一索引
  refreshUniqueIndex() {
    this.uniqueIndex = Symbol()
  }
}
