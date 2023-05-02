<template>
  <div
    v-if='Array.isArray(data)'
    class='form-grid-layout'
    :style='`width: ${grid.FORM_COLS/grid.TOTAL_COLS * 100}%;`'
    @keyup.enter='onEnter'>
    <template v-for='(row, index) in data'>
      <form-grid-row v-if='!(index>=2 && expanded === false)' :key='index'>
        <form-grid-col
          v-for='(col, i) in row'
          :key='i'
          :span='col.span'
          :columns='columns'>
          <form-grid-cell :config='col' />
        </form-grid-col>
      </form-grid-row>
    </template>
  </div>
</template>

<script setup lang="ts">
import FormGridRow from './form-grid-row.vue';
import FormGridCol from './form-grid-col.vue';
import FormGridCell from './form-grid-cell.tsx';
import { SIZE, GRID } from './constant';
import { computed, ref, watch, onMounted, PropType } from 'vue';
import { Config } from './type';

const props = defineProps({
  columns: {
    type: Number,
    default: 3
  },
  configs: {
    type: Array as PropType<Config[]>,
    default: () => []
  },
  size: {
    type: String,
    default: SIZE.NORMAL
  },
  defaultExpanded: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['enter']);

const data = ref<Config[][]>();
const expanded = ref(props.defaultExpanded);

const grid = computed(() => GRID[props.size]);

watch(() => props.configs, () => {
  makeLayoutData();
}, { deep: true });

onMounted(() => {
  makeLayoutData();
});

const makeLayoutData = () => {
  const d = [];
  let columns = 0;
  let row:Config[] = [];
  props.configs.forEach(config => {
    if (columns + config.span > props.columns) {
      d.push([...row]);
      row = [];
      columns = 0;
    }

    row.push(config);
    columns += config.span;
    if (columns > props.columns) {
      console.warn('布局显示超出');
    }
  });

  if (row.length > 0) {
    d.push([...row]);
  }
  data.value = d;
};

const expand = (e: boolean) => {
  expanded.value = e;
};

const getRowNumber = () => data.value!.length;

const onEnter = () => {
  emit('enter');
};

defineExpose({
  expand,
  getRowNumber
});

</script>

<style lang="scss" scoped>
.form-grid-layout{
  float: left;
  padding: 0 12px;
  box-sizing: border-box;
}
</style>