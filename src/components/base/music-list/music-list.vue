<template>
  <div class="music-list">
    <!-- 返回按钮 -->
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
   
    <!-- 标题 -->
    <h1 class="title" >{{ title }}</h1>
    <!-- 背景区域 -->
    <div class="bg-image" :style="bgImageStyle" ref="bgImgRef">
      <div class="filter"
      :style="filterStyle"
      ></div>
        <!-- 随机播放按钮 -->
     <div class="play-btn-wrapper" :style="palyStyle">
      <div class="play-btn" v-show="songs.length>0" @click="random">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
     </div>
    </div>
   
    <!--可滚动歌曲列表 -->
    <Scroll class="list" 
    :style="scrollStyle"
     :probe-type="3"
     @scroll="onScroll"
     >
      <div class="song-list-wrapper" >
        <SongerList :songs="songs"></SongerList>
      </div>
    </Scroll>
  </div>
</template>

<script setup>
import SongerList from "@/components/base/singer-liset/singer-list.vue";
import Scroll from "@/components/base/scroll/scroll.vue";
import { defineProps, computed ,ref,onMounted} from "vue";
import {useRouter} from "vue-router";
import {useRandomPlay,useSelectPlay} from "@/hook.js"
const router=useRouter()
const imageHeight=ref(0);
const bgImgRef=ref(null);
// 滚动Y轴的距离
const scrollY=ref(0)
//最大的滚动距离
const maxTranslteY=ref(0 )
const HEIGHT=40  
const props = defineProps({
  songs: {
    type: Array,
    default() {
      return [];
    },
  },
  title: String,
  pic: String,
});
const bgImageStyle = computed(() => {
  const scrollYs= scrollY.value;
  let zIndex=0 ;
  let paddingTop='70%';
  let height=0;
  // 解决ios兼容性问题
  let translateZ=0
  // 下拉放大
  let salce=1
  if(scrollYs<0){
    salce =1+Math.abs(scrollYs/imageHeight.value)
  }
  if(scrollYs>maxTranslteY.value ){
    zIndex=10 
    paddingTop=0;
    height='40px'
    translateZ=1
  }
  return { 
   backgroundImage: `url(${props.pic})`,
   zIndex,
   paddingTop,
   height,
   transform:`scale(${salce})`
  };
});
const filterStyle=computed(()=>{
  // 模糊程度
  let blur=0 ;
  const scrollYs=scrollY.value;
  const ImageHeight=imageHeight.value;
  if(scrollYs>=0){
    blur=Math.min(maxTranslteY.value/imageHeight.value,(scrollYs/ImageHeight))*20 
  }
  return {
    backdropFilter:`blur(${blur}px)`
  }
})
const palyStyle=computed(()=>{
  let display='';
  if(scrollY.value>=maxTranslteY.value){
    display="none"
  }
  return {
    display
  }
})
const scrollStyle=computed(()=>{
  return {
    top:`${imageHeight.value}px`
  }
})
const back=()=>{
  router.back()
}
const onScroll=(pos)=>{
  scrollY.value= -pos.y
   console.log('pos',pos);
}
//点击随机播放
const random=()=>{
  useRandomPlay(props.songs)
}
onMounted(()=>{
  imageHeight.value=bgImgRef.value.clientHeight
  maxTranslteY.value=imageHeight.value-HEIGHT
})
</script>

<style lang="scss" scoped>
.music-list {
  position: relative;
  height: 100%;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }
  .bg-image {
    position: relative;
    width: 100%;
    transform-origin: top;
    background-size: cover;
    // padding-top: 70%;
    // height: 0;
    // z-index: 1;
    .play-btn-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 10;
      width: 100%;
      .play-btn {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
      }
      .icon-play {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: $font-size-medium-x;
      }
      .text {
        display: inline-block;
        vertical-align: middle;
        font-size: $font-size-small;
      }
    }
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .list {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;
    // overflow: hidden;
    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
      
    }
  }
}
</style>