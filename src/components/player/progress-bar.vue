<template>
  <div class="progress-bar" @click="onClick">
    <div class="bar-inner">
      <div class="progress" :style="progressStyle" ref="barRef"></div>
      <div
        class="progress-btn-wrapper"
        :style="btnStyle"
        @touchstart.prevent="onTouchstart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  defineProps,
  ref,
  watch,
  getCurrentInstance,
  onMounted,
  computed,
  defineEmits,
} from "vue";
const barRef = ref(null);
const progressBtnWidth = 16;
const instant = getCurrentInstance();
const offset = ref(0);
let touch = ref({ x1: "", beginWidth: 0 });
const emit = defineEmits(["progress-changing", "progress-changed"]);
const props = defineProps({
  progress: {
    type: Number,
    default: 0,
  },
});
onMounted(() => {
  // console.log('barRef',barRef.value.clientWidth);
});
watch(props.progress, (newprogress) => {
  console.log("newprogress", newprogress);
  console.log("$el", instant.refs.ctx.$el);
  const barWidth = instant.refs.ctx?.$el.clientWidth - progressBtnWidth; //15||barRef.value.clientWidth-progressBtnWidth;
  offset.value = barWidth * newprogress;
});
const progressStyle = computed(() => {
  return `width:${offset.value}px`;
});
const btnStyle = computed(() => {
  return `transform:translate3d(${offset.value}px,0,0)`;
});

const onTouchstart = (e) => {
  touch.value.x1 = e.touches[0].pageX;
  touch.value.beginWidth = barRef.value.clientWidth;
};
const onTouchMove = (e) => {
  const delta = e.touches[0].pageX - touch.value.x1;
  const tempWidth = touch.value.beginWidth + delta;
  const barWidth = instant.ctx?.$el.clientWidth - progressBtnWidth;
  const progress = Math.min(1, Math.max(tempWidth / barWidth, 0));
  offset.value = barWidth * progress;
  emit("progress-changing", progress);
};
const onTouchEnd = () => {
  const barWidth = instant.ctx?.$el.clientWidth - progressBtnWidth;
  const progress = barRef.value.clientWidth / barWidth;
  emit("progress-changed", progress);
};
const onClick = (e) => {
  const rect = instant.ctx?.$el.getBoundingClientRect();
  const offsetWidth = e.pageX - rect.left;
  const barWidth = instant.ctx?.$el.clientWidth - progressBtnWidth;
  const progress = offsetWidth / barWidth;
  emit("progress-changed", progress);
};
</script>

<style lang="scss" scoped>
.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba($color: #000000, $alpha: 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }
    .progress-btn-wrapper {
      // position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
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