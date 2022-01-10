<template>
  <Example :file="localRaw">
    <ClientOnly>
      <div class="py-6 px-4">
        <Local />
      </div>
    </ClientOnly>
  </Example>
</template>

<script setup lang="ts">
import Example from '@theme-components/Examples/Example/Example.vue'
import Local from './Local.vue'
import localRaw from './Local.vue?raw'
</script>
