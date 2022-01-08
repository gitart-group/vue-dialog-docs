<template>
  <Example :file="transitionRaw">
    <ClientOnly>
      <div class="py-6 px-4 flex gap-4 justify-center">
        <TransitionExample />
      </div>
    </ClientOnly>
  </Example>
</template>

<script setup lang="ts">
import Example from '@theme-components/Examples/Example/Example.vue'
import TransitionExample from './TransitionExample.vue'
import transitionRaw from './TransitionExample.vue?raw'
</script>
