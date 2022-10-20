<template>
  <div class="player">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img :src="currentSong?.pic" alt="" />
      </div>
      <div class="top">
        <div class="back" @click="goBlack">
          <i class="icon-back"></i>
        </div>
        <h1 class="title">{{ currentSong?.name }}</h1>
        <h2 class="subtitle">{{ currentSong?.singer }}</h2>
      </div>
      <!-- 按键 -->
      <div class="bottom">
        <div class="operators">
          <div class="icon i-left">
            <i class="icon-sequence"></i>
          </div>
          <div class="icon i-left">
            <i class="icon-prev" @click="prev"></i>
          </div>
          <div class="icon i-center">
            <i :class="playIcon" @click="togglePaly"></i>
          </div>
          <div class="icon i-right">
            <i class="icon-next" @click="next"></i>
          </div>
          <div class="icon i-right">
            <i class="icon-not-favorite"></i>
          </div>
        </div>
      </div>
    </div>
    <audio ref="audioRef" @pause="pasue"></audio>
  </div>
</template>

<script setup>
import { ref, defineProps, computed, watch } from "vue";
import { useStore } from "@/store/index.js";
const audioRef = ref(null);
const store = useStore();
const props = defineProps({
  currentSong: {
    type: Object,
    default: {},
  },
});
const fullScreen = computed(() => {
  return store.fullScreen;
});
const currentSong = computed(() => {
  return store.currentSong;
});
const playing = computed(() => {
  return store.playing;
});
const playIcon = computed(() => {
  return playing.value ? "icon-pause" : "icon-play";
});
watch(currentSong, (newSong) => {
  if (newSong.id || !newSong.url) {
    return;
  }
  const audioEl = audioRef.value;
  audioEl.src = newSong.url;
  audioEl.play();
});
watch(playing, (newPlaying) => {
  const audioEl = audioRef.value;
  newPlaying ? audioEl.play() : audioEl.pasue();
});
const goBlack = () => {
  store.setFullscreen(false);
};
//获取当前播放歌曲的索引
const currentIndex = computed(() => {
  return store.currentIndex;
});
const palyList = computed(() => {
  return store.playList;
});
// 切换播放状态
const togglePaly = () => {
  store.setPlayingState(!playing.value);
};
const pasue = () => {
  store.setPlayingState(false);
};
const prev = () => {
  const list = palyList.value;
  let index = currentIndex.value - 1;
  if(!list.length) return
  // 判断是否只有一首歌曲
  if (list.length == 1) {
    //循环播放
    loop();
  } else {
    if (index === -1) {
      index = list.length - 1;
    }
    store.setCurrentIndex(index);
    if (!playing.value) {
      store.setPlayingState(true);
    }
  }
};
const next = () => {
  const list = palyList.value;
  let index = currentIndex.value + 1;
  if(!list.length) return
  if (list.length === 1) {
    loop();
  } else {
    if (index === list.length) {
      index = 0;
    }
    store.setCurrentIndex(index);
    if (!playing.value) {
      store.setPlayingState(true);
    }
  }
};
const loop = () => {
  const audioEl = audioRef.value;
  audioEl.currentTime = 0;
  audioEl.play();
};
</script>

<style lang="scss" scoped>
.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150px;
    background: $color-background;
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .top {
      position: relative;
      margin-bottom: 25px;
      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
      }
      .icon-back {
        display: block;
        padding: 9px;
        font-size: $font-size-large-x;
        color: $color-theme;
        transform: rotate(-90deg);
      }
      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        @include no-wrap();
        font-size: $font-size-large;
        color: $color-text;
      }
      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .operators {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          color: $color-theme;
          text-align: center;
          &.disable {
            color: $color-theme-d;
          }
          i {
            font-size: 30px;
          }
          .i-left {
            text-align: right;
          }
        }
      }
    }
  }
}
</style>