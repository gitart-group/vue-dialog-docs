<template>
  <div v-if="visible">
    <template v-if="sections">
      <button
        v-for="({ label, key }, index) in sections"
        :key="key"
        class="btn tab-btn"
        :class="{
          'tab-btn--active': index === activeSectionIndex,
        }"
        @click="activeSectionIndex = index"
      >
        {{ label }}
      </button>
    </template>

    <div class="code-wrapper">
      <div v-if="isLoading" class="code">
        <pre v-text="activeSection.html" />
      </div>
      <div v-else class="code" v-html="activeSection.html" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType, ref } from 'vue'

import { IPen } from '../../../composable/pen'
import { ISection, useCodeSections } from './useCodeSections'

const props = defineProps({
  pen: {
    type: Object as PropType<Partial<IPen>>,
    required: true,
  },

  visible: {
    type: Boolean,
    required: true,
  },
})

const { sections, isLoading } = useCodeSections(props.pen)

const activeSectionIndex = ref(0)
const activeSection = computed<ISection>(
  () => sections.value[activeSectionIndex.value],
)
</script>

<style lang="scss" scoped>
.code-wrapper {
  background-color: var(--code-bg-color);
  padding: 12px 30px 12px 16px !important;
  color: rgb(110, 110, 110);
}

.code {
  font-size: 14px;
  overflow-x: auto;

  ::v-deep(> pre) {
    background: transparent !important;
  }
}

.tab-btn {
  border-radius: 0;
  background: none;
  &--active {
    background: rgba(var(--t-brand-rgb), 0.15);
    border-bottom: 2px solid var(--t-brand);
    color: var(--t-brand);
  }
}
</style>
