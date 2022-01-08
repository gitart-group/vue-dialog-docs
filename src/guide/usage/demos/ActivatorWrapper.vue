<template>
  <Example :file="activatorRaw">
    <ClientOnly>
      <div class="py-6 px-4 flex justify-center">
        <Activator />
      </div>
    </ClientOnly>
  </Example>
</template>

<script setup lang="ts">
import Example from '@theme-components/Examples/Example/Example.vue'
import Activator from './Activator.vue'
import activatorRaw from './Activator.vue?raw'
</script>
