<template>
  <div class='form-grid-btn-group' :style='`width: ${grid.BTN_GROUP_COLS/grid.TOTAL_COLS * 100}%;`'>
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
    <div v-if='rowNumber > 2'>
      <el-button type='primary' link @click='onCollapse'>
        {{ expanded===true?'收起更多筛选器':'展开更多筛选器' }}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { SIZE, GRID } from './constant';

const props = defineProps({
  collapse: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: SIZE.NORMAL
  },
  defaultExpanded: {
    type: Boolean,
    default: false
  },
  rowNumber: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits([
  'expand',
  'reset',
  'search'
]); 

const expanded = ref(props.defaultExpanded);

const grid = computed(() => GRID[props.size]);


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
  text-align: right;
  float: left;
  padding: 0 12px;
  box-sizing: border-box;
}
</style>