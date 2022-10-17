import { defineConfig,normalizePath } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePathCss = normalizePath(path.resolve('@/assets/scss/variable.scss'))
const variablePathMiniCss = normalizePath(path.resolve('@/assets/scss/mixin.scss'))
// https://vitejs.dev/config/
export default defineConfig({
  //取别名
  resolve:{
    alias:{
      "@":path.resolve(__dirname,"../src")
    },
  },
   // css 相关的配置
   css: {
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePathCss}";`,
        additionalData: `@import "${variablePathMiniCss}";`
      }
    }
  },
  server:{
    open:true
  },
  plugins: [vue()]
})
