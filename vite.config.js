import { defineConfig,normalizePath } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

export default defineConfig({
  //取别名
  resolve:{
    alias:{
      "@":path.resolve(__dirname,"src"),
    },
  },
   // css 相关的配置
   css: {
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "@/assets/css/variable.scss";@import "@/assets/css/mixin.scss";`,
      }
    }
  },
  server:{
    open:true,
    proxy:{
      '/api': {
          target:'http://localhost:3001/',
          changeOrigin: true,
      },
  }
  },
 
  plugins: [vue()]
})

