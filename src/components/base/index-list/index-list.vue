<template>
  <Scroll class="index-list" 
   @scroll="onScroll" 
   :probe-type="3"
   ref="scrollRef"
   >
    <ul ref="groupRef">
      <li v-for="(s, index) of singerList" :key="index" class="group">
        <h2 class="title">{{ s.title }}</h2>
        <ul>
          <li v-for="(item, index) of s.list" :key="index" class="item" @click="onItemClick(item)">
            <img v-lazy="item.pic" class="avatar" />
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!-- 固定标题 -->
    <div class="fixed" v-if="fiexdTitle" :style="fiexdStyle">
      <div class="fiexd-title">{{ fiexdTitle }}</div>
    </div>
    <!-- 右侧固定导航栏 -->
    <div
      class="shortcut"
      @touchstart.stop.prevent="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchmove"
      @touchend.stop.prevent="onShortcutTouchend"
    >
      <ul>
        <li
          v-for="(item, index) of shortcutlist"
          :key="index"
          class="item"
          :data-index="index"
          :class="{ current: currentIndex == index }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </Scroll>
</template>

<script setup>
import Scroll from "@/components/base/scroll/scroll.vue";
import useFiexd from "./use-fixed.js";
import useShortcut from "./use-shortcut.js";
import { defineProps,defineEmits } from "vue";
const props = defineProps({
  singerList: {
    type: Array,
    default: [],
  },
});
const emit=defineEmits(['select'])
const { groupRef, onScroll, fiexdTitle, fiexdStyle, currentIndex } =useFiexd(props);
const { shortcutlist,onShortcutTouchStart,onShortcutTouchmove,onShortcutTouchend,scrollRef } = useShortcut(props,groupRef);
const onItemClick=(item)=>{
  emit('select',item)
}
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
  .shortcut {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    background: $color-background-d;
    font-family: Helvetica;
    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;
      text-align: center;
      &.current {
        color: $color-theme;
      }
    }
  }
}
</style>