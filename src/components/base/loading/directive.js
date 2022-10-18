import { remove } from "@vue/shared";
import { createApp } from "vue"
import Loading from "./loading.vue"
//挂载
function append(el){
  el.appendChild(el.instance.$el)
}
//移除
function removes(el){
  el.removeChild(el.instance.$el)
}
const myLodingDirective = {
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {
    const app=createApp(Loading);
    const instance=app.mount(document.createElement('div'));
    el.instance=instance;
    if(binding.value){
      append(el)
    }
  },
 
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {
    if(binding.value!==binding.odlValue){
             binding.value?append(el):removes(el)
    }
  },
  
}

export default myLodingDirective