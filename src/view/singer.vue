<template>
 <div class="singer" >
  <IndexList :singerList="singerList"/>
 </div>
</template>

<script setup>
import IndexList from "@/components/base/index-list/index-list.vue"
import { getsingList } from "@/service/singer.js";
import { ref, onMounted } from "vue";
const singerList = ref([]);
onMounted(() => {
  getsingList().then((res) => {
    singerList.value = res.singers;
  });
});
</script>

<style lang="scss" scoped>
.singer{
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>