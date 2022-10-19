<template>
  <div class="singer-detail">

  </div>
</template>

<script setup>
import {ref,onMounted,defineProps} from "vue"
 import {getSingerDetail}  from "@/service/singer.js"
 const props=defineProps({
    singer:{
      type:Object,
      default:()=>{}
    }
 })

 onMounted(async()=>{
  let res= await getSingerDetail(props.singer);
  console.log('res',res);
 })
</script>

<style lang="scss" scoped>
 .singer-detail{
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
 }
</style>