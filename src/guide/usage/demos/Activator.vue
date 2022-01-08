<template>
  <GDialog max-width="500">
    <template #activator="{ onClick }">
      <button class="btn btn--primary" @click="onClick">
        Open Dialog
      </button>
    </template>

    <template #default="{ onClose }">
      <div class="content">
        <p>Using slot</p>

        <button
          class="btn btn--outline-gray"
          @click="onClose"
        >
          Close
        </button>
      </div>
    </template>
  </GDialog>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    // works without any component data.
  },
})
</script>

<style lang="scss" scoped>
.content {
  padding: 20px;
  color: #000;
}
</style>
