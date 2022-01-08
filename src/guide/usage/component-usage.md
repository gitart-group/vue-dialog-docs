---
aside: deep
---

<script setup>
  import QuickStartBaseWrapper from '@theme-components/Examples/Instances/Introduction/QuickStartBaseWrapper.vue'
  import QuickStartStyledWrapper from '@theme-components/Examples/Instances/Introduction/QuickStartStyledWrapper.vue'
  import ActivatorWrapper from './demos/ActivatorWrapper.vue'
  import FullScreenWrapper from './demos/FullScreenWrapper.vue'
  import TransitionWrapper from './demos/TransitionWrapper.vue'
  import PersistentWrapper from './demos/PersistentWrapper.vue'
  import ScrollableWrapper from './demos/ScrollableWrapper.vue'
</script>

# Component Usage

<!-- - [GDialog Details](/docs/components/g-dialog) -->

The `GDialog` component is the main part of the package. Install it and use it like any other component.

All props you can find [here](/).

## Installation

```sh
yarn add gitart-vue-dialog
npm i gitart-vue-dialog
```

You can install the component [globally](https://v3.vuejs.org/guide/instance.html#application-component-instances) or [locally](https://v3.vuejs.org/guide/component-registration.html#local-registration). We will do it globally

```js
// main.js
import { GDialog } from 'gitart-vue-dialog'
import 'gitart-vue-dialog/dist/style.css'

const app = Vue.createApp(/* ... */)
app.component('GDialog', GDialog)
```

## Minimal working example

Let's use a standalone component (don't forget to [install](#installation)). In this example, we assume that you installed the component globally.

```vue-html
<template>
  <GDialog v-model="dialogState">
    Content 
  </GDialog>

  <button @click="dialogState = true">
    Open Dialog
  </button>
</template>
```

<div class="options-api">

```vue
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({
    dialogState: false,
  }),
})
</script>
```

</div>
<div class="composition-api">

```vue
<script>
import { ref, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const dialogState = ref(false)

    return {
      dialogState,
    }
  },
})
</script>
```

</div>

<QuickStartBaseWrapper class="mb-6" />

Pretty **ugly** dialog, right? Let's add background and some content. Take a look:

<QuickStartStyledWrapper class="mb-6" />

## Examples

### Activator slot 

`v1.1.0`

`GDialog` has an `activator` slot that helps activate the component when clicked on inside.
`default` slot has `onClose` scoped function to close the dialog.

<ActivatorWrapper />


### Fullscreen

Due to limited space, full-screen dialogs may be more appropriate for mobile devices.

<FullScreenWrapper />

### Transition

You can customize appearing with custom transitions.

<TransitionWrapper />

### Persistent

With `persistent` clicking on the outside does not close the dialog

<PersistentWrapper />

### Scrollable

`scrollable` allows you to make scroll content somewhere inside your dialog. To make fixed actions or header, etc...

<ScrollableWrapper />