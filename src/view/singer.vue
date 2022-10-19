<template>
  <div class="singer">
    <IndexList :singerList="singerList" @select="selectSinger"/>
    <!-- 二级路由 歌手详情 -->
    <router-view :singer="selectSinge"></router-view>
  </div>
</template>

<script setup>

import { getsingList } from "@/service/singer.js";
import { ref, onMounted } from "vue";
import {useRouter} from "vue-router"
import IndexList from "@/components/base/index-list/index-list.vue";
const singerList = ref([]);
const selectSinge=ref(null)
const route=useRouter()
onMounted(() => {
  getsingList().then((res) => {
    singerList.value = res.singers;
  });
});
const selectSinger=(item)=>{
  selectSinge.value=item;
  route.push({
    path:`/singer/${item.mid}`
  })
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