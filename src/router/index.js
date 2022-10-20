import { createRouter, createWebHashHistory } from "vue-router";
const routers = [
  // {
  //   path:'/',
  //   redirect:() => import('@/view/recommend.vue')
  // },
  {
    path: "/recommend",
    component: () => import('@/view/recommend.vue')
  },
  {
    path: "/singer",
    component: () => import('@/view/singer.vue'),
    children:[
      {
        path:':id',
        component:()=>import("@/view/singer-detail.vue")
      }
    ]
  },
  {
    path: "/top-list",
    component: () => import('@/view/top-list.vue')
  },
  {
    path: "/search",
    component: () => import('@/view/search.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: routers
})

export default router