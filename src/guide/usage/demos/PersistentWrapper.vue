<template>
  <Example :file="persistentRaw">
    <ClientOnly>
      <div class="py-6 px-4 flex gap-4 justify-center">
        <Persistent />
      </div>
    </ClientOnly>
  </Example>
</template>

<script setup lang="ts">
import Example from '@theme-components/Examples/Example/Example.vue'
import Persistent from './Persistent.vue'
import persistentRaw from './Persistent.vue?raw'
</script>
