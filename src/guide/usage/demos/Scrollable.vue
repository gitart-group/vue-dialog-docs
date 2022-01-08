<template>
  <GDialog v-model="dialogState" max-width="400" scrollable>
    <div class="dialog">
      <div class="content">
        <p v-for="i in 10" :key="i">
          Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Voluptatum voluptas laboriosam
          voluptate ex consequuntur corporis, commodi animi
          architecto quidem fugiat.
        </p>
      </div>

      <div class="actions">
        <button
          class="btn btn--outline-gray"
          @click="dialogState = false"
        >
          Close
        </button>
      </div>
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

<style lang="scss" scoped>
.dialog {
  color: #000;
  display: flex;
  flex-direction: column;
}

.content {
  padding: 30px 20px;
  overflow: auto;
}

.actions {
  padding: 10px;
  border-top: 1px solid rgb(179, 179, 179);
}
</style>
