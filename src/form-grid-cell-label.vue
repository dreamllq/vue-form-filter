<template>
  <div v-if='isOver === false' ref='container' class='form-grid-cell--label'>
    <span ref='content'>{{ label }}</span>
  </div>
  <el-tooltip
    v-else 
    effect='light'
    :content='label'
    :open-delay='300'
    :enterable='false'
    placement='top-start'>
    <div ref='container' class='form-grid-cell--label'>
      <span ref='content'>{{ label }}</span>
    </div>
  </el-tooltip>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

defineProps({
  label: {
    type: String,
    default: ''
  }
});

const container = ref();
const content = ref();

const isOver = ref(false);

onMounted(() => {
  const containerWidth = container.value.clientWidth;
  const contentWidth = content.value.offsetWidth;

  if (contentWidth > containerWidth) {
    isOver.value = true;
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
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: right;
    flex: none;
  }
</style>