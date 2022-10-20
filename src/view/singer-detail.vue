<template>
  <div class="singer-detail">
    <MusicList :songs=songs :title="title" :pic="pic"/>
  </div>
</template>
<script setup>
import { ref,reactive, onMounted, defineProps ,computed} from "vue";
import { getSingerDetail } from "@/service/singer.js";
import { processSongs } from "@/service/song.js";
import MusicList from "@/components/base/music-list/music-list.vue"
const songs=ref([]);
// const title=ref('')
const props = defineProps({
  singer: {
    type: Object,
    default: () => {},
  },
});
onMounted(async () => {
  let res = await getSingerDetail(props.singer);
  songs.value=res.songs
  // let songs = await processSongs(res.songs);
});
const title=computed(()=>{
  return props.singer&& props.singer.name
})
const pic=computed(()=>{
  return props.singer&&props.singer.pic
})
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>