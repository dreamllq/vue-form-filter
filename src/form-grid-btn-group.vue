<template>
  <div class='form-grid-btn-group'>
    <div>
      <slot>
        <el-button type='primary' plain @click='onReset'>
          重置
        </el-button>
        <el-button type='primary' @click='onSearch'>
          查询
        </el-button>
      </slot>
    </div>
    <div v-if='rowNumber > minShowLineNumber'>
      <el-button type='primary' link @click='onCollapse'>
        {{ expanded===true?'收起更多筛选器':'展开更多筛选器' }}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  collapse: {
    type: Boolean,
    default: false
  },
  defaultExpanded: {
    type: Boolean,
    default: false
  },
  rowNumber: {
    type: Number,
    default: 0
  },
  btnGroupWidth: {
    type: Number,
    default: 205
  },
  minShowLineNumber: {
    type: Number,
    default: 2
  }
});

const emit = defineEmits([
  'expand',
  'reset',
  'search'
]); 

const expanded = ref(props.defaultExpanded);



const onCollapse = () => {
  emit('expand');
};
const onReset = () => {
  emit('reset');
};
const onSearch = () => {
  emit('search');
};
const expand = (e:boolean) => {
  expanded.value = e;
};

defineExpose({ expand });
</script>

<style lang="scss" scoped>
.form-grid-btn-group{
  flex: none;
  padding-left: 12px;
  // text-align: right;
  // float: left;
  // padding: 0 12px;
  // box-sizing: border-box;
}
</style>