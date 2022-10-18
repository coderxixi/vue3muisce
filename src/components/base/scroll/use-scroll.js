import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import { onMounted, onUnmounted,ref } from 'vue'
BScroll.use(ObserveDOM)
export default function useScroll(warappRef,option){
  const scroll=ref(null);
  onMounted(()=>{
    scroll.value=  new BScroll(warappRef.value,
     {...option, observeDOM: true } 
      )
  })
  onUnmounted(()=>{
    scroll.value.destroy()
  })
}