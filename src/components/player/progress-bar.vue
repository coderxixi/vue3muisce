<template>
  <div class="progress-bar" ref="barRef">
    <div class="bar-inner">
      <div class="progress" :style="progressStyle"></div>
      <div class="progress-btn-wrapper" :style="btnStyle">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps,ref,watch,getCurrentInstance,onMounted,computed} from "vue";
const barRef=ref(null)
const progressBtnWidth=16
const instant=getCurrentInstance()
const offset=ref(0)
const props=defineProps({
  progress:{
      type:Number,
      default:0
  }
})
onMounted(()=>{
  // console.log('barRef',barRef.value.clientWidth);
})
watch(props.progress,(newprogress)=>{
  console.log('newprogress',newprogress);
  console.log('$el',barRef.value);
  const barWidth= 15||barRef.value.clientWidth-progressBtnWidth;
  offset.value=barWidth*newprogress
})
const progressStyle=computed(()=>{
   return `width:${offset.value}px`
})
const btnStyle=computed(()=>{
  return `transform:translate3d(${offset.value}px,0,0)`
}
 
)
</script>

<style lang="scss" scoped>
  .progress-bar{
    height: 30px;
    .bar-inner{
      position: relative;
      top: 13px;
      height: 4px;
      background: rgba($color: #000000, $alpha: .3);
      .progress{
        position: absolute;
        height: 100%;
        background: $color-theme;
      }
      .progress-btn-wrapper{
        position: absolute;
        left: -8px;
        top: -13px;
        width: 30px;
        height: 30px;
        .progress-btn-{
          position: relative;
          top: -7px;
          left: -7px;
          box-sizing: border-box;
          width: 16px;
          height: 16px;
          border: 3px solid $color-text;
          border-radius: 50%;
          background: $color-theme;
        }
      }
    }
  }
</style>