<template>
  <Example :file="quickStartBaseRaw">
    <ClientOnly>
      <div class="py-6 px-4 flex justify-center">
        <QuickStartBase />
      </div>
    </ClientOnly>
  </Example>
</template>

<script setup lang="ts">
import Example from '../../Example/Example.vue'
import QuickStartBase from './QuickStartBase.vue'
import quickStartBaseRaw from './QuickStartBase.vue?raw'
</script>
