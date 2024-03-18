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
  server: {
    host: true,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'https://jsonplaceholder.typicode.com/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
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
