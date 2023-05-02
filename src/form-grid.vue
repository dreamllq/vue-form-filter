<template>
  <div ref='formGrid' class='form-grid'>
    <div ref='hiddenItems' class='hidden'>
      <slot /> 
    </div>
    <div v-if='ready === true && sizeReady === true' class='form-grid--container'>
      <form-grid-layout
        ref='formGridLayoutRef'
        :size='size'
        :configs='configs'
        :default-expanded='expanded'
        :columns='grid.FORM_COLS/grid.FORM_ITEM_COLS' 
        @enter='onSearch' />

      <form-grid-btn-group
        ref='formGridBtnGroupRef'
        :default-expanded='expanded'
        :row-number='rowNumber'
        :size='size'
        @expand='onExpand'
        @reset='onReset'
        @search='onSearch'>
        <template #default>
          <slot name='buttonGroup' />
        </template>
      </form-grid-btn-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick, onMounted, onUnmounted, PropType } from 'vue';
import { findIndex, cloneDeep } from 'lodash';
import FormGridLayout from './form-grid-layout.vue';
import FormGridBtnGroup from './form-grid-btn-group.vue';
import { debounce } from 'lodash';
import { SIZE, GRID } from './constant';
import { Config } from './type';

const props = defineProps({
  model: {
    type: Object as PropType<{[index: string]: any}>,
    default: () => ({})
  }
});

const emit = defineEmits(['search']);

const formGrid = ref();
const formGridLayoutRef = ref();
const formGridBtnGroupRef = ref();

const configs = ref<Config[]>([]);
const ready = ref(false);
const initValues = ref<{[index: string]: any}>({});
const size = ref();
const sizeReady = ref(false);
const rowNumber = ref();
const expanded = ref(false);

let observer:ResizeObserver;

const grid = computed(() => GRID[size.value]);

watch(() => size.value, async () => {
  sizeReady.value = false;
  await nextTick();
  sizeReady.value = true;
  await nextTick();
  rowNumber.value = formGridLayoutRef.value.getRowNumber();
});

initValues.value = cloneDeep(props.model);

onMounted(() => {
  observer = new ResizeObserver(() => {
    pageResize();
  });

  observer.observe(formGrid.value);
  setSize();
  ready.value = true;
});

onUnmounted(() => {
  observer.disconnect();
});

const pageResize = debounce(function() {
  nextTick(() => {
    setSize();
  });
}, 200);

const setSize = () => {
  const width = formGrid.value.clientWidth;
  if (width < 1024 - 216 - 24 - 24 - 10) {
    size.value = SIZE.MINI;
  } else if (width < 1440 - 216 - 24 - 24 - 10) {
    size.value = SIZE.SMALL;
  } else if (width < 1920 - 216 - 24 - 24 - 10) {
    size.value = SIZE.NORMAL;
  } else {
    size.value = SIZE.LARGE;
  }
  sizeReady.value = true;
};

const insertConfig = (config: Config, index: number) => {
  configs.value.splice(index, 0, config);
};

const removeConfig = (config: Config) => {
  const index = findIndex(configs.value, (o) => o.id === config.id);
  configs.value.splice(index, 1);
};

const onReset = () => {
  Object.keys(props.model).forEach(key => props.model[key] = initValues.value[key]);
  emit('search');
};

const onSearch = () => {
  emit('search');
};

const onExpand = () => {
  expanded.value = !expanded.value;
  formGridLayoutRef.value.expand(expanded.value);
  formGridBtnGroupRef.value.expand(expanded.value);
};

defineExpose({
  insertConfig,
  removeConfig
});

</script>

<style lang="scss" scoped>
.form-grid {
  .hidden{
    display: none;
  }

  .form-grid--container{
    margin: 0 -12px;

    &::after {
      display: table;
      content: "";
      clear: both;
    }
  }
}

</style>

<style lang="scss">
.form-grid-cell {
  .form-grid-cell--component{
    .el-select,
    .el-select-v2,
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner,
    .el-date-editor,
    .el-input,
    .el-cascader {
      width: 100%;
      box-sizing: border-box;
    }
  }
}
.form-grid-cell{
  display: flex;
  
  
  .form-grid-cell--component{
    flex: 1;
    overflow: hidden;
  }
}
</style>