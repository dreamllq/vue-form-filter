<template>
  <div
    ref='layoutRef'
    class='form-grid-layout'
    @keyup.enter='onEnter'>
    <template v-if='Array.isArray(data)'>
      <template v-for='(row, index) in data'>
        <form-grid-row v-if='!(index >= minShowLineNumber && expanded === false)' :key='index'>
          <form-grid-col
            v-for='(col, i) in row'
            :key='i'
            :span='col.span'
            :columns='columns'>
            <form-grid-cell :config='col' />
          </form-grid-col>
        </form-grid-row>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import FormGridRow from './form-grid-row.vue';
import FormGridCol from './form-grid-col.vue';
import FormGridCell from './form-grid-cell.tsx';
import { ref, watch, PropType, computed } from 'vue';
import { Config } from './type';
import { useElementSize } from '@vueuse/core';

const props = defineProps({
  configs: {
    type: Array as PropType<Config[]>,
    default: () => []
  },
  defaultExpanded: {
    type: Boolean,
    default: false
  },
  miniItemWidth: {
    type: Number,
    default: 300
  },
  minShowLineNumber: {
    type: Number,
    default: 2
  }
});

const emit = defineEmits(['enter', 'row-count-change']);

const expanded = ref(props.defaultExpanded);
const layoutRef = ref();

const { width } = useElementSize(layoutRef);

const columns = computed(() => Math.floor(width.value / props.miniItemWidth));

const data = computed<Config[][]>(() => {
  const d = [];
  let cols = 0;
  let row:Config[] = [];
  props.configs.forEach(config => {
    if (cols + config.span > columns.value) {
      d.push([...row]);
      row = [];
      cols = 0;
    }

    row.push(config);
    cols += config.span;
  });

  if (row.length > 0) {
    d.push([...row]);
  }
  return d;
});

watch(() => data.value.length, () => {
  emit('row-count-change', data.value.length);
});

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
  flex: 1;
  overflow: hidden;
}
</style>