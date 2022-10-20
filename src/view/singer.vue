<template>
  <div class="singer">
    <IndexList :singerList="singerList" @select="selectSinger"/>
    <!-- 二级路由 歌手详情 -->
    
      <router-view :singer="selectSinge" v-slot="{Component}">
        <Transition name="slide" appear enter-active-class="slide-enter-active" slide-enter-from > 
           <component :is="Component"></component>
           </Transition>
      </router-view>
   
  
  </div>
</template>

<script setup>
import storage from "good-storage"
import { getsingList } from "@/service/singer.js";
import { ref, onMounted } from "vue";
import {useRouter} from "vue-router"
import IndexList from "@/components/base/index-list/index-list.vue";
import {SINGER_KEY} from "@/assets/js/constant.js"
const singerList = ref([]);
const selectSinge=ref(null)
const route=useRouter()
onMounted(() => {
  getsingList().then((res) => {
    singerList.value = res.singers;
  });
});
const selectSinger=(item)=>{
  cacheSinger(item)
  selectSinge.value=item;
  route.push({
    path:`/singer/${item.mid}`
  })
}
//缓存
const cacheSinger=(singer)=>{
  storage.session.set(SINGER_KEY,singer)
}
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>