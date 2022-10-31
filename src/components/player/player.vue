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
      <!-- 旋转唱片 -->
      <div class="middle">
        <div class="middle-l">
          <div class="cd-wrapper">
            <div class="cd" ref="cdRef">
              <img
                ref="cdImgRef"
                class="image"
                :class="cdCls"
                :src="currentSong?.pic"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 按键 -->
      <div class="bottom">
        <div class="progress-wrapper">
          <span class="time time-l">{{ formatTime(currentTime) }}</span>
          <div class="progress-bar-wrapper">
            <ProgressBar
              :progress="progress"
              @progressChanging="onProgressChangeing"
              @progressChanged="onProgressChanged"
            />
          </div>
          <span class="time time-r">{{
            formatTime(currentSong?.duration)
          }}</span>
        </div>
        <div class="operators">
          <div class="icon i-left">
            <i :class="modeIcon" @click="changeMode"></i>
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
            <i
              :class="getFavoriteIcon(currentSong)"
              @click="toggleFavorite(currentSong)"
            ></i>
          </div>
        </div>
      </div>
    </div>

    <audio
      ref="audioRef"
      @pause="pasue"
      @timeupdate="updateTime"
      @ended="end"
    ></audio>
  </div>
</template>

<script setup>
import { ref, defineProps, computed, watch } from "vue";
import { useStore } from "@/store/index.js";
import useMode from "./use-mode.js";
import { PLAY_MODE } from "@/assets/js/constant.js";
import { formatTime } from "@/assets/js/util.js";
import useFavorite from "./use-favorite.js";
import ProgressBar from "./progress-bar.vue";
import useCd from "./use-cd.js";
import useLyric from "./use-lyric.js"
const { modeIcon, changeMode } = useMode();
const { getFavoriteIcon, toggleFavorite } = useFavorite();
const audioRef = ref(null);
const progressChanging = ref(false);
const currentTime = ref(0);
// useLyric()
useLyric()
const store = useStore();
const { cdCls,cdRef,cdImgRef} = useCd();
const props = defineProps({
  currentSong: {
    type: Object,
    default: {},
  },
});
const progress = computed(() => {
  // return currentTime.value/ currentSong.value.duration
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
const playMode = computed(() => store.playMode);
watch(currentSong, (newSong) => {
  if (newSong.id || !newSong.url) {
    return;
  }
  currentTime.value = 0;
  const audioEl = audioRef.value;
  audioEl.src = newSong.url;
  audioEl.play();
});
watch(playing, (newPlaying) => {
  const audioEl = audioRef.value;
  // newPlaying ? audioEl.play() : audioEl.pasue();
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
  if (!list.length) return;
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
  if (!list.length) return;
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
const updateTime = (e) => {
  if (!progressChanging.value) {
    currentTime.value = e.target.currentTime;
  }
};
const onProgressChangeing = (progress) => {
  progressChanging.value = true;
  currentTime.value = currentSong.value.duration * progress;
};
const onProgressChanged = (progress) => {
  progressChanging.value = false;
  audioRef.value.currentTime = currentTime.value =
    currentSong.value.duration * progress;
  if (!playing.value) {
    store.setPlayingState(true);
  }
};
const end = () => {
  currentTime.value = 0;
  if (playMode.value === PLAY_MODE.loop) {
    loop();
  } else {
    next();
  }
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
    z-index: 150;
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
    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          box-sizing: border-box;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            img {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border-radius: 50%;
              border: 10px solid rgba(255, 255, 255, 0.1);
            }
            .playing {
              animation: rotate 20s linear infinite;
            }
          }
        }
        .playing-lyric-wrapper {
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;
          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
        }
      }
      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;
          .text {
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
            &.current {
              color: $color-text;
            }
          }
          .pure-music {
            padding-top: 50%;
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .dot-wrapper {
        text-align: center;
        font-size: 0;
        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $color-text-l;
          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll;
          }
        }
      }
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;
        .time {
          color: $color-text;
          font-size: $font-size-small;
          flex: 0 0 40px;
          line-height: 30px;
          width: 40px;
          &.time-l {
            text-align: left;
          }
          &.time-r {
            text-align: right;
          }
        }
        .progress-bar-wrapper {
          flex: 1;
        }
      }
      .operators {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          color: $color-theme;
          &.disable {
            color: $color-theme-d;
          }
          i {
            font-size: 30px;
          }
        }
        .i-left {
          text-align: right;
        }
        .i-center {
          padding: 0 20px;
          text-align: center;
          i {
            font-size: 40px;
          }
        }
        .i-right {
          text-align: left;
        }
        .icon-favorite {
          color: $color-sub-theme;
        }
      }
    }
    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 0.6s;
      .top,
      .bottom {
        transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
      }
    }
    &.normal-enter-from,
    &.normal-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }
}
</style>