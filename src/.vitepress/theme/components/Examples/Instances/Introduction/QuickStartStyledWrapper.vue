<template>
  <Example :file="quickStartStyledRaw">
    <ClientOnly>
      <div class="py-6 px-4 flex justify-center">
        <QuickStartStyled />
      </div>
    </ClientOnly>
  </Example>
</template>

<script setup lang="ts">
import Example from '../../Example/Example.vue'
import QuickStartStyled from './QuickStartStyled.vue'
import quickStartStyledRaw from './QuickStartStyled.vue?raw'
</script>
