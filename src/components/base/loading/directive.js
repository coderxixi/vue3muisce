import {addClass,removeClass} from "@/assets/js/dom.js"
import { createApp } from "vue"
import Loading from "./loading.vue"
const relativeCls='g-relative';
//添加样式

//挂载
function append(el){
  //动态获取定位元素的样式 
const style= getComputedStyle(el);
if(['absolute','fixed','relative'].indexOf(style.position)==-1){
   addClass(el,relativeCls)
}
  el.appendChild(el.instance.$el)
}
//移除
function remove(el){
  removeClass(el,relativeCls)
  // el.removeChild(el.instance.$el)
  
}
const myLodingDirective = {
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {
    const app=createApp(Loading);
    const instance=app.mount(document.createElement('div'));
    const title=binding.arg;
    if(typeof title !=="undefined"){
    
    } instance.setTitle(title)
    el.instance=instance;
    if(binding.value){
      append(el)
    }
  },
 
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {
    if(binding.value!==binding.odlValue){
             binding.value?append(el):remove(el)
    }
  },
  
}

export default myLodingDirective