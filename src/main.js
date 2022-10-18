import { createApp } from 'vue'
import '@/assets/css/index.scss'
import router from '@/router'
import lazyPlugin from "vue3-lazy"
import App from './App.vue'
 const app= createApp(App);
 app.use(lazyPlugin,{
  loading:"../src/assets/images/default.png",
 
 })
 app.use(router)
 app.mount('#app')
