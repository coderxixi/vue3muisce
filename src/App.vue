<script setup>
    import Hearder from '@/components/header/header.vue'
    import Tabs from "@/components/tab/tab.vue"
</script>

<template>
  <div>
  <Hearder />
   <Tabs/>
   <!-- 视图 -->
   <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
</style>
