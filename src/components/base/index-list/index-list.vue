<template>
  <Scroll class="index-list">
    <ul>
      <li v-for="(s, index) of singerList" :key="index" class="group">
        <h2 class="title">{{ s.title }}</h2>
        <ul>
          <li v-for="(item, index) of s.list" :key="index" class="item">
            <img v-lazy="item.pic" class="avatar"  />
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </Scroll>
</template>

<script setup>
import Scroll from "@/components/base/scroll/scroll.vue";

import {defineProps} from "vue";
defineProps({
  singerList:{
    type:Array,
    default:[]
  }
})
</script>

<style lang="scss" scoped>
.index-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .group {
    padding-bottom: 30px;
    .title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
    .item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar{
        border-radius: 50%;
        width: 50px;
        height: 50px;
      }
      .name{
        margin-left: 20px;
      }
    }
  }
}
</style>