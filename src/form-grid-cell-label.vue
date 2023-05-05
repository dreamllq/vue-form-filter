<template>
  <div class='form-grid-cell--label'>
    <text-tip :msg='label' placement='top-start' />
  </div>
</template>

<script setup lang="ts">
import { TextTip } from 'lc-vue-text-tip';

defineProps({
  label: {
    type: String,
    default: ''
  }
});

</script>


<style lang="scss" scoped>
  .form-grid-cell--label{
    width: 85px;
    margin-right: 16px;
    line-height: 32px;
    font-size: 14px;
    color: #333;
    text-align: right;
    flex: none;
  }
</style>