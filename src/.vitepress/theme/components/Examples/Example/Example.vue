<template>
  <div class="code-example">
    <ExampleToolbar @toggleCode="onToggleCodeVisibility" />

    <ExampleCode :pen="pen" :visible="isCodeVisible" />

    <div class="code-example__slot-wrapper">
      <div class="code-example__slot">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from '@vueuse/core'

import { usePen } from '../../../composable/pen'

import ExampleToolbar from './ExampleToolbar.vue'
import ExampleCode from './ExampleCode.vue'

const props = defineProps({
  file: {
    type: String,
    required: true,
  },
})

const pen = usePen(props.file)

const [isCodeVisible, onToggleCodeVisibility] = useToggle()
</script>

<style lang="scss">
.code-example {
  border: 1px solid var(--vt-c-divider-light);
  border-radius: 6px;
  overflow: hidden;

  &__slot-wrapper {
    border-top: 1px solid var(--vt-c-divider-light);
  }

  &__slot {
    margin: 10px;
    border-radius: 6px;
    background: rgba(var(--t-brand-rgb), 0.15);
  }
}
</style>
