import { defineComponent, PropType, computed } from 'vue';
import FormGridCellLabel from './form-grid-cell-label.vue';

export default defineComponent({
  components: { FormGridCellLabel },
  props: {
    config: {
      type: Object,
      required: true
    },
    labelWidth: {
      type: Number,
      default: 85
    },
    labelPosition: {
      type: String as PropType<'left' | 'top'>,
      default: 'left'
    }
  },
  setup(props) {
    const className = computed(() => props.labelPosition === 'left' ? 'label-left' : 'label-top');
    return { className };
  },
  render() {
    return <div class={`form-grid-cell ${this.className}`} >
      <form-grid-cell-label label={this.config.label} labelWidth={this.labelWidth} labelPosition={this.labelPosition}/>
      <div class='form-grid-cell--component'>
        {this.config.render()}
      </div>
    </div>;
  }
});
