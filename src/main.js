import { createApp } from 'vue'
import '@/assets/css/index.scss'
import router from '@/router'
import App from './App.vue'
 const app= createApp(App);
 console.log("router",router);
 app.use(router)
 app.mount('#app')
