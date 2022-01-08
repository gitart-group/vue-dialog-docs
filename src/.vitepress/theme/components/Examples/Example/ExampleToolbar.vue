<template>
  <div class="example-toolbar">
    <span class="font-semibold text-primary"> Live Example </span>

    <button
      class="btn rounded-full w-10 h-10 p-0 text-primary"
      @click="onToggleCode"
    >
      <Icon :icon-path="codeIcon" />
    </button>
  </div>
</template>

<script setup lang="ts">
import Icon from '../../Core/Icon.vue'

import { mdiXml as codeIcon } from '@mdi/js'

const emit = defineEmits(['toggleCode'])
const onToggleCode = () => {
  emit('toggleCode')
}
</script>

<style lang="scss">
.example-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 12px;
}
</style>
