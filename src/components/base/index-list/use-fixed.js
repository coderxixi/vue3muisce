import { ref, watch, nextTick,computed } from "vue"

export default function useFiexd(props) {
  const listHeights = ref([])
  const groupRef = ref(null)
  const scrollY = ref(0)
  const currentIndex = ref(0)
  const fiexdTitle=computed(()=>{
    const currentGroup=props.singerList[currentIndex.value]
    return currentGroup?currentGroup.title:''
  })
  watch(() => props.singerList, async() => {
    await nextTick()
    calculate()
  })
  //监听滚动
  watch(scrollY, (newY) => {
    const listHeightsVal = listHeights.value;
    for (let i = 0; i < listHeightsVal.length - 1; i++) {
      const heightTop = listHeightsVal[i];
      const heightBottom = listHeights[i + 1];
      if (newY >= heightTop || newY <= heightBottom) {
        currentIndex.value = i
      }
    }
  })

  //求解列表高度
  function calculate() {
   
    const list = groupRef.value.children;
    const listHeightsVal = listHeights.value;
    let height = 0;
    listHeightsVal.length = 0;
    listHeightsVal.push(height)
    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight;
      listHeightsVal.push(height)
    }
  }
  function onScroll(pos) {
    console.log('pos',pos);
    scrollY.value = -pos.y
  }
  return { groupRef, onScroll, fiexdTitle}
}