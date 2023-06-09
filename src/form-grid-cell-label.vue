<template>
  <div class='form-grid-cell--label' :style='style'>
    <text-tip :msg='label' placement='top-start' />
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import { TextTip } from 'lc-vue-text-tip';

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  labelWidth: {
    type: Number,
    default: 85
  },
  labelPosition: {
    type: String as PropType<'left' | 'top'>,
    default: 'left'
  }
});

const style = computed(() => (props.labelPosition === 'left' ? {
  width: `${props.labelWidth}px`,
  marginRight: '16px',
  textAlign: 'right'
} : {}));

</script>


<style lang="scss" scoped>
  .form-grid-cell--label{
    line-height: 32px;
    font-size: 14px;
    color: #333;
    flex: none;
  }
</style>