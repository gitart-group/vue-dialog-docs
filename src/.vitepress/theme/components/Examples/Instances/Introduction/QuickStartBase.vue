<template>
  <GDialog v-model="dialogState">
    <span class="text-black">
      Content 
    </span>
  </GDialog>

  <button class="btn btn--primary" @click="dialogState = true">
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
