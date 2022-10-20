<script setup>
    import Hearder from '@/components/header/header.vue'
    import Tabs from "@/components/tab/tab.vue"
    import Player from "@/components/player/player.vue"
</script>

<template>
  <div>
  <Hearder />
   <Tabs/>
   <!-- 视图 -->
   <router-view></router-view>
   <!-- 播放器 -->
   <Player/>
  </div>
</template>

<style scoped lang="scss">
</style>
