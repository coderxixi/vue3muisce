<template>
  <div class="scroll" ref="rootRef">
     <slot></slot>
  </div>
</template>

<script setup>

import {ref,defineProps,defineEmits,defineExpose} from "vue"
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
const scroll= useScroll(rootRef,props,emit);
defineExpose({scroll})
</script>

<style lang="scss" scoped>

</style>