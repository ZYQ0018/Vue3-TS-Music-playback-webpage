import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'
import pxToViewport from "postcss-px-to-viewport";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [
        pxToViewport({
          unitToConvert: ["px"], // 需要做转换的单位
          viewportWidth: 2560, // UI设计稿的宽度
          minPixelValue: 2, // 最小转换数值，如果为2则会转换大于2的数值
          mediaQuery: false, // 允许在媒体查询中转换px
          // 其他配置项...
        }),
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
