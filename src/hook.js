import {useStore} from "@/store/index.js"
import { PLAY_MODE } from "@/assets/js/constant.js"
import {shuffle} from "@/assets/js/util.js"
const store=useStore();
export function useSelectPlay(list,index){
  store.setPlayingState(true)
  store.setSquenceList(list)
  store.setPlayList(list)
  store.setPlayMode(PLAY_MODE.sqeuence)
  store.setCurrentIndex(index)
  store.setFullscreen(true)

}
export function useRandomPlay(list){

  store.setPlayingState(true)
  store.setSquenceList(list)
  store.setPlayList(shuffle(list))
  store.setPlayMode(PLAY_MODE.random)
  store.setCurrentIndex(0)
  store.setFullscreen(true)
}

export function useChangeMode(mode){
  if(mode==PLAY_MODE.random){
    store.setPlayList(shuffle(store.sequencelist))
  }else{
    store.setPlayList(store.sequencelist)
  }
  store.setPlayMode(mode)
}