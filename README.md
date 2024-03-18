# 项目概述

## 版本信息

| 序号 | 技术         | 版本                          |
|----|------------|-----------------------------|
| 1  | Node.js    | 18.16.1 (64-bit executable) |
| 2  | Vue        | 3.4                         |
| 3  | TypeScript | 5.2                         |
| 4  | 包管理工具      | 推荐使用 pnpm 也可以使用其他           |

## 插件

| 序号 | 插件名称                    | 描述     |
|----|-------------------------|--------|
| 1  | unplugin-auto-import    | 导入 API |
| 2  | unplugin-vue-components | 导入组件   |

## ESLint

- 请开启 `eslint` 插件，以便在编辑器中实时检查代码风格。
- 请设置保存时或者提交时自动触发 `lint`

## commitLint

- 参考 husky/commit-msg 的内容

## 约定规则

### 组件规则

| 类型   | 存放路径                       |
|------|----------------------------|
| 公共组件 | `src/components`           |
| 模块组件 | `src/views/xxx/components` |

### 样式规则

| 类型   | 存放路径                |
|------|---------------------|
| 公共样式 | `src/global`        |
| 模块样式 | 直接在对应模块下创建`.less`文件 |

### 类型规则

| 类型   | 存放路径                    |
|------|-------------------------|
| 全局类型 | `src/constant`          |
| 模块类型 | `src/views/xxx/type.ts` |

### 接口规则

- 针对某一模块的接口统一放在 `src/views/api/` 文件夹内。如果有多个模块，可以在 `api` 文件夹下再新建文件或者文件夹。

### 路由规则

- 若创建新的模块页面，需要在 `src/router/index.ts` 中引入模块路由。
- 对于非首页或是用户常用的模块，请使用懒加载的方式引入模块路由。

### 工具方法

- 在 utils 内增加工具方法，例如 time、qs 等可复用方法一定要提取出来
