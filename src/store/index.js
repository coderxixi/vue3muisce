import { defineStore } from 'pinia'
import { PLAY_MODE } from "@/assets/js/constant.js"
 export  const useStore = defineStore('storeId', {
  state: () => {
    return {
      sequencelist: [], //顺序播放列表
      playList: [],//正在播放到歌曲列表
      playing: false,//是否正在播放
      playMode: PLAY_MODE.sequence,//播放模式
      currentIndex: 0,//当前正在播放到歌曲
      fullScreen: false//播放的状态 全屏 收缩
    }
  },
  getters: {
    //计算播放歌曲
    currentSong: (state) => {
      return state.playList[state.currentIndex]
    },
  },
  actions: {
    //修改播放状态
    setPlayingState(playing){
     this.playing=playing
    },
    //设置顺序播放列表
    setSquenceList(list){
      this.sequencelist=list
    },
    //播放列表
    setPlayList(list){
      console.log('list',list);
      this.playList=list
    },
    //修改播放模式
    setPlayMode(mode){
     
      this.playMode=mode
    },
    //设置当前播放索引
    setCurrentIndex(current){
     this.currentIndex=current
    },
    //设置当前播放大小
    setFullscreen(fullScreen){
      this.fullScreen=fullScreen
    }
  },
})