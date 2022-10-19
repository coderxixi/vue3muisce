<template>
  <div class="scroll" ref="rootRef">
     <slot></slot>
  </div>
</template>

<script setup>

import {ref,defineProps,defineEmits} from "vue"
import useScroll from "./use-scroll"
const emit= defineEmits(['scroll'])
const props= defineProps({
  click:{
    type:Boolean,
    default:true
  },
  probeType:{
   type:Number,
   default:0
  }
})
const rootRef=ref(null)
useScroll(rootRef,props,emit)
</script>

<style lang="scss" scoped>

</style>