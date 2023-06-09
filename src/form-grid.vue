<template>
  <div ref='formGrid' class='form-grid'>
    <div ref='hiddenItems' class='hidden'>
      <slot /> 
    </div>
    <div v-if='ready === true && sizeReady === true' class='form-grid--container'>
      <form-grid-layout
        ref='formGridLayoutRef'
        :configs='configs'
        :default-expanded='expanded'
        :btn-group-width='btnGroupWidthComputed'
        :columns='columns' 
        :min-show-line-number='minShowLineNumber'
        @enter='onSearch' />

      <form-grid-btn-group
        v-if='onlyForm === false'
        ref='formGridBtnGroupRef'
        :default-expanded='expanded'
        :btn-group-width='btnGroupWidthComputed'
        :row-number='rowNumber'
        :min-show-line-number='minShowLineNumber'
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
import { Config } from './type';

const props = defineProps({
  model: {
    type: Object as PropType<{[index: string]: any}>,
    default: () => ({})
  },
  minShowLineNumber: {
    type: Number,
    default: 2
  },
  miniItemWidth: {
    type: Number,
    default: 300
  },
  btnGroupWidth: {
    type: Number,
    default: 205
  },
  onlyForm: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['search']);

const formGrid = ref();
const formGridLayoutRef = ref();
const formGridBtnGroupRef = ref();

const configs = ref<Config[]>([]);
const ready = ref(false);
const initValues = ref<{[index: string]: any}>({});
const sizeReady = ref(false);
const rowNumber = ref();
const expanded = ref(props.onlyForm);
const columns = ref(0);

const btnGroupWidthComputed = computed(() => props.onlyForm === true ? 0 : props.btnGroupWidth);

let observer:ResizeObserver;

watch(() => columns.value, async () => {
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

  if (width < btnGroupWidthComputed.value) {
    console.error('容器宽度太小');
    return;
  }
  const cols = Math.floor((width - btnGroupWidthComputed.value) / props.miniItemWidth);
  columns.value = cols === 0 ? 1 : cols;
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
    display: flex;
    width: 100%;
    // margin: 0 -12px;

    // &::after {
    //   display: table;
    //   content: "";
    //   clear: both;
    // }
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