/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// src/vue-shim.d.ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // 假设没有特定的 props 和 emits，这里使用 unknown
  const component: DefineComponent<unknown, unknown, any>
  export default component
}
