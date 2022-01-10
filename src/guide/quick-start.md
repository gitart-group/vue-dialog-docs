<script setup>
  import QuickStartBaseWrapper from '@theme-components/Examples/Instances/Introduction/QuickStartBaseWrapper.vue'
  import QuickStartStyledWrapper from '@theme-components/Examples/Instances/Introduction/QuickStartStyledWrapper.vue'
</script>

# Quick Start


:::tip API Preference
This page and many other chapters later in the guide contain different content for Options API and Composition API. Your current preference is <span class="options-api">Options API</span><span class="composition-api">Composition API</span>. You can toggle between the API styles using the "API Preference" switches at the top of the left sidebar.
:::

## Installation

```sh
yarn add gitart-vue-dialog
npm i gitart-vue-dialog
```

For base usage, you should import component and styles.
You can install the component [globally](https://v3.vuejs.org/guide/instance.html#application-component-instances) or [locally](https://v3.vuejs.org/guide/component-registration.html#local-registration). We will do it globally.

```js
// main.js
import 'gitart-vue-dialog/dist/style.css'
import { GDialog } from 'gitart-vue-dialog'

const app = Vue.createApp(/* ... */)
app.component('GDialog', GDialog)
```

Additionally, you can install plugin for advanced usage:

```js
// main.js
import { plugin as dialogPlugin } from 'gitart-vue-dialog'

const app = Vue.createApp(/* ... */)
app.use(dialogPlugin)
```

More about that read on the [plugin guide](/guide/usage/plugin-usage).

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

Looks better.