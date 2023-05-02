import { v4 as uuidv4 } from 'uuid';
import { defineComponent, ref, onMounted, getCurrentInstance, onUnmounted } from 'vue';
import { Config } from './type';

export default defineComponent({
  name: 'FormGridItem',
  props: {
    label: {
      type: String,
      default: ''
    },
    span: {
      type: Number,
      default: 1
    },
    prop: {
      type: String,
      required: true
    }
  }, 
  setup(props, { slots }) {
    const instance = getCurrentInstance();

    const config = ref<Config>({ 
      id: uuidv4(),
      label: props.label,
      prop: props.prop,
      span: props.span,
      render: () => slots.default ? slots.default() : slots.default
    });

    onMounted(() => {
      const hiddenItems: Element = instance!.parent!.refs!.hiddenItems as Element;
      const children: HTMLCollection = hiddenItems.children;
      const index = getElIndex(children, instance!.refs.el as Element);
      instance!.parent!.exposed!.insertConfig(config.value, index);
    });

    onUnmounted(() => {
      instance!.parent!.exposed!.removeConfig(config.value);
    });

    const getElIndex = (children: HTMLCollection, child:Element) => ([] as Element[]).indexOf.call(children, child);
  },
  render() {
    return <div ref='el'></div>;
  }
});