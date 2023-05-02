<template>
  <div class='form-grid-row'>
    <slot />
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.form-grid-row {
  margin: 0 -12px 12px;


  &::after {
    display: table;
    content: "";
    clear: both;
  }

  &:last-child{
    margin-bottom: 0;
  }
}
</style>