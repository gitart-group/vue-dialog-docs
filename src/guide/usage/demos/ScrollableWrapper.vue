<template>
  <Example :file="scrollableRaw">
    <ClientOnly>
      <div class="py-6 px-4 flex gap-4 justify-center">
        <Scrollable />
      </div>
    </ClientOnly>
  </Example>
</template>

<script setup lang="ts">
import Example from '@theme-components/Examples/Example/Example.vue'
import Scrollable from './Scrollable.vue'
import scrollableRaw from './Scrollable.vue?raw'
</script>
