<template>
  <div>
    歌手页面
  </div>
</template>

<script setup>
import {getsingList} from "@/service/singer.js"
import {ref,onMounted} from "vue"
onMounted(()=>{
  getsingList().then((res)=>{
    console.log("res",res);
  })
})
</script>

<style lang="scss" scoped>

</style>