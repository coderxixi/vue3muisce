<template>
  <div class="singer-detail">
    <MusicList :songs=songs :title="title" :pic="pic"/>
  </div>
</template>
<script setup>
import storage from "good-storage"
import {SINGER_KEY} from "@/assets/js/constant.js"
import { ref,reactive, onMounted, defineProps ,computed} from "vue";
import { getSingerDetail } from "@/service/singer.js";
import { processSongs } from "@/service/song.js";
import MusicList from "@/components/base/music-list/music-list.vue";
import {useRouter } from "vue-router";
const router=useRouter()
const songs=ref([]);
const props = defineProps({
  singer: {
    type: Object,
    default:''
  },
});
onMounted(async () => {
  // console.log("computedSinger.value",computedSinger.value.mid);
  let res = await getSingerDetail(computedSinger.value);
  songs.value=res.songs
  // let songs = await processSongs(res.songs);
});
const computedSinger=computed(()=>{
  const id=router.currentRoute.value.params.id
  let ret=null ;
  let singer=props.singer;
  if(singer){
    ret=singer
  }else{
    const cachedSinger=storage.session.get(SINGER_KEY);
    console.log('cachedSinger',cachedSinger,id);
    if(cachedSinger&&cachedSinger.mid==id){
      ret=cachedSinger
    }
  }
  console.log('res',ret);
  return ret 
})
const title=computed(()=>{
  return computedSinger.value&& computedSinger.value.name
})
const pic=computed(()=>{
  return computedSinger.value&&computedSinger.value.pic
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