<template>
  <GDialog v-model="dialogState" max-width="500">
    <div class="wrapper">
      <div class="content">
        <div class="title">Content</div>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Porro, ratione!
        </p>
      </div>

      <div class="actions">
        <button
          class="btn btn--outline-gray"
          @click="dialogState = false"
        >
          Submit
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

<style scoped>
.wrapper {
  color: #000;
}

.content {
  padding: 20px;
}

.title {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
