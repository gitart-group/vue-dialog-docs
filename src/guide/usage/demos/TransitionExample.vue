<template>
  <GDialog
    v-model="dialogState1"
    max-width="400"
    transition="custom-rotate-transition"
  >
    <div class="text-black px-6 py-4">
      <p class="mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Nobis id est unde quo itaque ex, tenetur quae,
        maxime.
      </p>

      <button
        class="btn btn--outline-gray"
        @click="dialogState1 = false"
      >
        Close
      </button>
    </div>
  </GDialog>

  <GDialog
    v-model="dialogState2"
    max-width="400"
    transition="custom-from-bottom-transition"
  >
    <div class="text-black px-6 py-4">
      <p class="mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Nobis id est unde quo itaque ex, tenetur quae,
        maxime.
      </p>

      <button
        class="btn btn--outline-gray"
        @click="dialogState2 = false"
      >
        Close
      </button>
    </div>
  </GDialog>

  <button
    class="btn btn--primary"
    @click="dialogState1 = true"
  >
    Rotate Transition
  </button>

  <button
    class="btn btn--primary"
    @click="dialogState2 = true"
  >
    From Bottom Transition
  </button>
</template>

<script>
import { ref, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const dialogState1 = ref(false)
    const dialogState2 = ref(false)

    return {
      dialogState1,
      dialogState2,
    }
  },
})
</script>

<style lang="scss">
.custom-rotate-transition {
  &-enter-from {
    transform: translate(0, 30px) rotate(20deg);
    opacity: 0;
  }

  &-leave-to {
    transform: translate(0, 30px) rotate(10deg);
    opacity: 0;
  }
}

.custom-from-bottom-transition {
  &-enter-from {
    transform: translate(0, 100%);
    opacity: 0;
  }

  &-leave-to {
    transform: translate(0, -30%);
    opacity: 0;
  }
}
</style>
