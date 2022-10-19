import { ref, computed } from "vue"


export default function useShortcut(props, refs) {
  const ANCHOR_HEIGHT = 18;//单个字母的高度
  const scrollRef = ref(null)
  const shortcutlist = computed(() => {
    return props.singerList.map((item) => {
      return item.title
    })
  })
  const touch = {}
  function scrollTo(index){
    if(isNaN(index)) return
     index=Math.max(0,Math.min(shortcutlist.value.length-1,index)) 
    const targetEl = refs.value.children[index];
    const scroll = scrollRef.value.scroll
    scroll.scrollToElement(targetEl, 0)
  }
  //点击
  const onShortcutTouchStart = (e) => {
    const anchorIndex = parseInt(e.target.dataset.index);
    touch.y1 = e.touches[0].pageY
    touch.anchorIndex = anchorIndex
    scrollTo(anchorIndex)
  }
  //手指移动
  const onShortcutTouchmove = (e) => {
    touch.y2 = e.touches[0].pageY
    const delta = (touch.y2 - touch.y1) / ANCHOR_HEIGHT | 0;
    const anchorIndex = touch.anchorIndex + delta;
    scrollTo(anchorIndex)
  }
  const onShortcutTouchend = (e) => {

  }
  return { shortcutlist, onShortcutTouchStart, onShortcutTouchmove, scrollRef, onShortcutTouchend }
}