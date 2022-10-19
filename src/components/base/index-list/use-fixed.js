import { ref, watch, nextTick, computed } from "vue"

export default function useFiexd(props) {
  const TITLE_HEIGHT = 30
  const listHeights = ref([])
  const groupRef = ref(null)
  const scrollY = ref(0)
  const currentIndex = ref(0)
  const distance = ref(0)
  const fiexdTitle = computed(() => {
    if (scrollY.value < 0) {
      return ""
    }
    const currentGroup = props.singerList[currentIndex.value]
    return currentGroup ? currentGroup.title : ''
  })
  const fiexdStyle = computed(() => {
    console.log("fiexdStyle");
    const distanceVal = distance.value
    const diff = (distanceVal > 0 && distanceVal < TITLE_HEIGHT) ? distanceVal - TITLE_HEIGHT : 0
    return {
      transform: `translate3d(0,${diff}px,0 )`
    }
  })
  watch(() => props.singerList, async () => {
    await nextTick()
    calculate()
  })
  //监听滚动
  watch(scrollY, (newY) => {
    const listHeightsVal = listHeights.value;
    for (let i = 0; i < listHeightsVal.length - 1; i++) {
      const heightTop = listHeightsVal[i];
      const heightBottom = listHeights.value[i + 1];
      if (newY >= heightTop && newY <= heightBottom) {
        console.log("heightTop-heightBottom", heightTop, heightBottom);
        currentIndex.value = i
        distance.value = heightBottom - newY
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
    scrollY.value = -pos.y
  }
  return { groupRef, onScroll, fiexdTitle, fiexdStyle, currentIndex }
}