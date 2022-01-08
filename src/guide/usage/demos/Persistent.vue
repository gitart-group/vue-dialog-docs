<template>
  <GDialog
    v-model="dialogState"
    max-width="400"
    persistent
  >
    <div class="text-black px-6 py-4">
      <p class="mb-4">
        Clicking on the outside does not close the dialog :)
      </p>

      <button
        class="btn btn--outline-gray"
        @click="dialogState = false"
      >
        Close
      </button>
    </div>
  </GDialog>

  <button
    class="btn btn--primary"
    @click="dialogState = true"
  >
    Open Dialog
  </button>
</template>

<script>
import { ref, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const dialogState = ref(false)

    return {
      dialogState,
    }
  },
})
</script>

