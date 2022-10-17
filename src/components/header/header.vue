<template>
  <div class="header">
  <span class="icon"></span>
  <h1 class="text">Chicken Music</h1>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
 .header{
  height: 44px;
  text-align: center;
  color: $color-theme;
  font-size: 0;
  .icon{
    display: inline-block;
    vertical-align: top;
    margin-top: 6px;
    width: 30px;
    height: 32px;
    margin-left: 9px;
    @include bg-imgage('logo');
    background-size: 30px 32px;
  }
 }
</style>