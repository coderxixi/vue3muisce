import { createApp } from 'vue'
import '@/assets/css/index.scss'
import router from '@/router'
import lazyPlugin from "vue3-lazy"
import App from './App.vue'
import myLodingDirective from "@/components/base/loading/directive.js"
 const app= createApp(App);
 app.use(lazyPlugin,{
  loading:"../src/assets/images/default.png",
 
 })
 app.directive("loading",myLodingDirective)
 app.use(router)
 app.mount('#app')
