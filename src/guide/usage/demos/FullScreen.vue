<template>
  <GDialog v-model="dialogState" fullscreen>
    <div class="content">
      <p>Content</p>

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

<style scoped>
.content {
  color: #000;
  padding: 20px;
}
</style>