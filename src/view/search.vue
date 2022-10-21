<template>
  <div class="search">
    <!-- 搜索区域 -->

    <Scroll class="search-content">
      <Collapse :list="list" @change="ahyhan" v-model="activeNames">
      
      </Collapse>
    </Scroll>
  </div>
</template>

<script setup>
import Scroll from "@/components/base/scroll/scroll.vue";
import Collapse from "@/components/Collapse.vue";
import { ref } from "vue";
const activeNames=ref(0)
const list = ref([
  {
    title: "2022年12月25日",
    flag: false,
    children: [
      {
        phone: 18046823271,
        number: +5,
        text: "营销积分",
        jifen: 5,
        time: 2018 - 5 - 14,
      },
      {
        phone: 18046823271,
        number: +5,
        text: "营销积分",
        jifen: 5,
        time: 2018 - 5 - 14,
      },
      {
        phone: 18046823271,
        number: +5,
        text: "营销积分",
        jifen: 5,
        time: 2018 - 5 - 14,
      },
      {
        phone: 18046823271,
        number: +5,
        text: "营销积分",
        jifen: 5,
        time: 2018 - 5 - 14,
      },
    ],
  },
  {
    title: "2022年12月26日",
    flag: true,
    children: [
      {
        phone: 18046823271,
        number: +5,
        text: "营销积分",
        jifen: 5,
        time: 2018 - 5 - 14,
      },
      {
        phone: 18046823271,
        number: +5,
        text: "营销积分",
        jifen: 5,
        time: 2018 - 5 - 14,
      },
      {
        phone: 18046823271,
        number: +5,
        text: "营销积分",
        jifen: 5,
        time: 2018 - 5 - 14,
      },
      {
        phone: 18046823271,
        number: +5,
        text: "营销积分",
        jifen: 5,
        time: 2018 - 5 - 14,
      },
      {
        phone: 18046823271,
        number: +5,
        text: "营销积分",
        jifen: 5,
        time: 2018 - 5 - 14,
      },
      {
        phone: 18046823271,
        number: +5,
        text: "营销积分",
        jifen: 5,
        time: 2018 - 5 - 14,
      },
      {
        phone: 18046823271,
        number: +5,
        text: "营销积分",
        jifen: 5,
        time: 2018 - 5 - 14,
      },
      {
        phone: 18046823271,
        number: +5,
        text: "营销积分",
        jifen: 5,
        time: 2018 - 5 - 14,
      },
    ],
  },
  {
    title: "2022年12月27日",
    flag: false,
    children: [
      {
        phone: 18046823271,
        number: +5,
        text: "营销积分",
        jifen: 5,
        time: 2018 - 5 - 14,
      },
      {
        phone: 18046823271,
        number: +5,
        text: "营销积分",
        jifen: 5,
        time: 2018 - 5 - 14,
      },
      {
        phone: 18046823271,
        number: +5,
        text: "营销积分",
        jifen: 5,
        time: 2018 - 5 - 14,
      },
      {
        phone: 18046823271,
        number: +5,
        text: "营销积分",
        jifen: 5,
        time: 2018 - 5 - 14,
      },
    ],
  },
  {
    title: "2022年12月28日",
    flag: true,
    children: [
      {
        phone: 18046823271,
        number: +5,
        text: "营销积分",
        jifen: 5,
        time: 2018 - 5 - 14,
      },
      {
        phone: 18046823271,
        number: +5,
        text: "营销积分",
        jifen: 5,
        time: 2018 - 5 - 14,
      },
      {
        phone: 18046823271,
        number: +5,
        text: "营销积分",
        jifen: 5,
        time: 2018 - 5 - 14,
      },
      {
        phone: 18046823271,
        number: +5,
        text: "营销积分",
        jifen: 5,
        time: 2018 - 5 - 14,
      },
      {
        phone: 18046823271,
        number: +5,
        text: "营销积分",
        jifen: 5,
        time: 2018 - 5 - 14,
      },
      {
        phone: 18046823271,
        number: +5,
        text: "营销积分",
        jifen: 5,
        time: 2018 - 5 - 14,
      },
      {
        phone: 18046823271,
        number: +5,
        text: "营销积分",
        jifen: 5,
        time: 2018 - 5 - 14,
      },
      {
        phone: 18046823271,
        number: +5,
        text: "营销积分",
        jifen: 5,
        time: 2018 - 5 - 14,
      },
    ],
  },
]);

const ahyhan = (index) => {
  console.log("index", index);
  list.value[index].flag = !list.value[index].flag;
};
</script>

<style lang="scss" scoped>
.search {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
.search-content {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #222;
}
</style>