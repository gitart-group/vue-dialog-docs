<template>
  <Example :file="fullScreenRaw">
    <ClientOnly>
      <div class="py-6 px-4 flex justify-center">
        <FullScreen />
      </div>
    </ClientOnly>
  </Example>
</template>

<script setup lang="ts">
import Example from '@theme-components/Examples/Example/Example.vue'
import FullScreen from './FullScreen.vue'
import fullScreenRaw from './FullScreen.vue?raw'
</script>
