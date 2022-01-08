import { ref } from 'vue'
import { GDialog } from 'gitart-vue-dialog'

export default {
  components: {
    GDialog,
  },
  setup() {
    const dialogState = ref(false)

    return {
      dialogState,
    }
  }
}
