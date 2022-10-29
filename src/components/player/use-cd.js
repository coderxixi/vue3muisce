import { useStore } from "../../store";
import { computed, ref, watch } from "vue";

export default function useCd() {
  const cdRef = ref(null);
  const cdImgRef = ref(null);
  const store = useStore();
  const playing = computed(() => store.playing);
  const cdCls = computed(() => {
    return playing.value ? 'playing' : ''
  })
  watch(playing, (newPlaying) => {
    if (!newPlaying) {
      syncTransform(cdRef.value, cdImgRef.value)
    }
  })

  function syncTransform(wrapper, inner) {
    const wrapperTransfrom = getComputedStyle(wrapper).transform
    const innerTransfrom = getComputedStyle(inner).transform;
    wrapper.style.transform = wrapperTransfrom == "none" ? innerTransfrom : innerTransfrom.concat(wrapperTransfrom)
    // inner.style.transform=innerTransfrom

  }
  return { cdCls, cdRef, cdImgRef }
}