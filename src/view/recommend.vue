<template>
  <div>
    推荐页面
  </div>
</template>

<script setup>
import {getRecommend} from "@/service/recommend.js"
import {onMounted} from "vue";
onMounted(()=>{
  getRecommend()
  console.log('onMounted');
})
</script>

<style lang="scss" scoped>

</style>