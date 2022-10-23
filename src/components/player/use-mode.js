
import { ref, defineProps, computed, watch } from "vue";
import { useStore } from "@/store/index.js";
import {PLAY_MODE} from "@/assets/js/constant.js"
import {useChangeMode} from "@/hook.js"
export default function useMode(){
  const store=useStore();
  const playMode=computed(()=>store.playMode);
  const modeIcon=computed(()=>{
    const playModeValue=playMode.value
    return playModeValue===PLAY_MODE.sequence ?'icon-sequence':playModeValue==PLAY_MODE.random?'icon-random':'icon-loop';
  })
const changeMode=()=>{
  const mode=(playMode.value+1)%3
  store.setPlayMode(mode)
  // useChangeMode(mode)
}
  return {
    modeIcon,
    changeMode
  }
}