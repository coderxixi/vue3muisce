import { createApp } from 'vue'
import '@/assets/css/index.scss'
import router from '@/router'
import lazyPlugin from "vue3-lazy"
import App from './App.vue'
import myLodingDirective from "@/components/base/loading/directive.js"
import noResultDirective from "@/components/base/no-result/directive.js"
import { createPinia } from 'pinia'
 const app= createApp(App);
 app.use(lazyPlugin,{
  loading:"../src/assets/images/default.png",
 
 })
 app.directive("loading",myLodingDirective),
 app.directive('noresult',noResultDirective)
 app.use(router)
 app.use(createPinia())
 app.mount('#app')
