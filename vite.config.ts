import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // proxy: {
  //   // 配置代理，这对于 API 请求转发到后端服务器特别有用
  //   '/api': 'http://localhost:3000',
  // },
  build: {
    minify: 'esbuild',
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      dts: 'types/auto-imports.d.ts',
    }),
    Components({
      dts: 'types/components.d.ts',
      resolvers: [ElementPlusResolver()],
    }),
  ],
  esbuild: {
    target: 'esnext',
  },
})
