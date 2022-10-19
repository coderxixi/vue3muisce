<template>
  <Scroll class="index-list" @scroll="onScroll" :probe-type="3">
    <ul ref="groupRef">
      <li v-for="(s, index) of singerList" :key="index" class="group">
        <h2 class="title">{{ s.title }}</h2>
        <ul>
          <li v-for="(item, index) of s.list" :key="index" class="item">
            <img v-lazy="item.pic" class="avatar" />
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!-- 固定标题 -->
    <div class="fixed">
      <div class="fiexd-title">{{ fiexdTitle }}</div>
    </div>
  </Scroll>
</template>

<script setup>
import Scroll from "@/components/base/scroll/scroll.vue";
import useFiexd from "./use-fixed.js";
import { defineProps } from "vue";
const props = defineProps({
  singerList: {
    type: Array,
    default: [],
  },
});

const { groupRef ,onScroll,fiexdTitle} = useFiexd(props);

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
      .avatar {
        border-radius: 50%;
        width: 50px;
        height: 50px;
      }
      .name {
        margin-left: 20px;
      }
    }
  }
  .fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fiexd-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }
}
</style>