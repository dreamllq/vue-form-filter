import { defineComponent } from 'vue';
import FormGridCellLabel from './form-grid-cell-label.vue';

export default defineComponent({
  components: { FormGridCellLabel },
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  render() {
    return <div class='form-grid-cell'>
      <form-grid-cell-label label={this.config.label} />
      <div class='form-grid-cell--component'>
        {this.config.render()}
      </div>
    </div>;
  }
});
