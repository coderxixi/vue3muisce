<template>
  <div class="loading">
    <div class="loading-content">
      <img src="./loading.gif" alt="" width="24" height="24">
      <p class="desc">{{titleRef}}</p>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";
let titleRef=ref('加载中...')

</script>

<style lang="scss" scoped>
  .loading{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%,-50%,0);
    .loading-content{
      text-align: center;
      .desc{
        line-height: 20px;
        font-size: $font-size-small;
        color:$color-text-l
      }
    }
  }
</style>