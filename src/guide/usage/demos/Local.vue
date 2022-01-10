<template>
  <div class="wrapper">
    <header grid="spa">Header</header>

    <aside>Sidebar</aside>

    <main>
      <div>
        <input
          type="text"
          placeholder="Name"
          class="border-primary border-solid border-2 rounded-md placeholder-gray-400 w-full px-2 py-1 mb-3"
        />
      </div>

      <button
        class="btn btn--outline-gray"
        @click="dialogState = true"
      >
        Submit
      </button>

      <GDialog v-model="dialogState" max-width="400" local>
        <div class="text-black px-6 py-4">
          <p class="mb-4">Warning! Fill out the form.</p>

          <button
            class="btn btn--outline-gray"
            @click="dialogState = false"
          >
            Close
          </button>
        </div>
      </GDialog>
    </main>
  </div>
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
.wrapper {
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-gap: 15px;
  color: #000;

  header,
  aside,
  main {
    background: #fafafa;
    border-radius: 4px;
    padding: 10px;
  }

  header {
    grid-column: span 2 / span 2;
  }

  main {
    position: relative;
    min-height: 200px;
    overflow: auto;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;

    header {
      grid-column: auto;
    }
  }
}
</style>
