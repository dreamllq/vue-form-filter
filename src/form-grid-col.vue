<template>
  <div class='form-grid-col' :style='`width: ${span/columns * 100}%`'>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  span: {
    type: Number,
    default: 1
  },
  columns: {
    type: Number,
    default: 3
  }
});
</script>

<style lang="scss" scoped>
.form-grid-col{
  padding-left: 12px;
  padding-right: 12px;
  float: left;
  box-sizing: border-box;
}
</style>