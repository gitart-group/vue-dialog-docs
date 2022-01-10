---
aside: deep
---

# Plugin Usage

## Installation


```js
// main.js
import { plugin as dialogPlugin } from 'gitart-vue-dialog'

const app = Vue.createApp(/* ... */)
app.use(dialogPlugin)
```

We strongly recommend using GDialogRoot. It renders your [dialogs](#dialogs). 
Put it somewhere at the end of the `App.vue`.

Or write your own alternative. Look [here](/guide/components/g-dialog-root) how GDialogRoot works

```vue{2,7,11}
<template >
  <GDialogRoot />
</template>

<script>
import { defineComponent } from 'vue'
import { GDialogRoot } from 'gitart-vue-dialog'

export default defineComponent({
  components: {
    GDialogRoot,
  },
})
</script>
```

## Usage

There are two ways to access the methods and properties of the plugin (option and composition api). See below:

### **Option api**: 

In any method you have access to `this.$dialog`.

```js{6}
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    someMethod() {
      // this.$dialog
      // $dialog.addDialog()
      // $dialog.removeDialog()
      // $dialog.dialogs
    },
  },
})
```

### Composition api

Make injection inside you setup function by `inject` and `dialogInjectionKey`.

```js
import { inject } from 'vue'
import { dialogInjectionKey } from 'gitart-vue-dialog'
```

```js{2,6}
import { defineComponent, inject } from 'vue'
import { dialogInjectionKey } from 'gitart-vue-dialog'

export default defineComponent({
  setup() {
    const $dialog = inject(dialogInjectionKey)
    // $dialog.addDialog()
    // $dialog.removeDialog()
    // $dialog.dialogs
  }
})
```


To know how all these properties work, look below.

## Properties


**$dialog** has such properties:

| Name | Type |
|:---|:---|
| [addDialog](#adddialog-data) | `Function` |
| [removeDialog](#removedialog-index) | `Function` |
| [dialogs](#dialogs) | `Array` |

### `addDialog(data)`

- **Type:** `Function`

- **Arguments:**
  - {Object} data - <code>{ component: DialogComponent, props: { ... } }</code>

- **Details:** <br/>
  The method adds your extended `data` argument to [dialogs](#dialogs) array.
  The `data.component` will be rendered in the [GDialogRoot](/guide/components/g-dialog-root) with the props you add to `data.props`

  ::: warning
    `data.props` should not contain modelValue. The `addDialog` overwrites it
  :::

  ::: info
  To close the dialog (DialogComponent.vue) you need inside emit the event `update:modelValue` with `false` inside. Take a look at the [example](#example) below
  :::

---

### `removeDialog(index)` 

- **Type:** `Function`

- **Arguments:**
  - {Number} index

- **Details:** <br/>
  The method removes item from [dialogs](#dialogs) by index. Useful if you decide to write your own [GDialogRoot](/guide/components/g-dialog-root)

---

### `dialogs` 
- **Type:** `Array`

- **Details:** <br/>
  Array of the IDialogItem. The array can be rendered in any part of your app. 
  We recommend use [GDialogRoot](/guide/components/g-dialog-root) for it.
  ```ts
  interface IDialogItem {
    component: ShallowUnwrapRef<Component>
    id: number
    props: {
      modelValue: boolean
      // other props
    }
  }
  ```

--- 


## Example

:::info
In this example, we assume that you installed the `GDialog` globally and added GDialogRoot to your root component (like App.vue)

```js
import {
  GDialog,
  plugin as dialogPlugin 
} from 'gitart-vue-dialog';
import 'gitart-vue-dialog/dist/style.css';

const app = Vue.createApp(/* ... */)
app.use(dialogPlugin)
app.component('GDialog', GDialog)
```

:::



First, create your Dialog component to launch it from a method. Let's name it InfoDialog.vue

```html
<GDialog v-model="value" max-width="300">
  <div>
    Info Alert
  </div>

  {{ info }}
</GDialog>
```

<div class="options-api">

```js
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    info: {
      type: String,
      required: true,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    dialogState: {
      get() {
        return this.modelValue
      },

      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
  },
})
```

</div>
<div class="composition-api">

```js
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    info: {
      type: String,
      required: true,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const dialogState = computed({
      get() {
        return props.modelValue
      },

      set(value) {
        emit('update:modelValue', value)
      },
    })

    return {
      dialogState,
    }
  },
})
```

</div>

Well. Now let's create a component where we launch InfoDialog. Name it Launcher.vue. There will be only a button in the template

```vue-html
<button @click="onOpen">Open</button>
```

<div class="options-api">

```js
import { defineComponent } from 'vue';
import InfoDialog from './InfoDialog.vue';

export default defineComponent({
  methods: {
    onOpen() {
      this.$dialog.addDialog({
        component: InfoDialog,
        props: {
          info: 'Some kind of message from outside InfoDialog',
        },
      });
    },
  },
});
```

</div>
<div class="composition-api">

```js
import { inject, defineComponent } from 'vue';
import { dialogInjectionKey } from 'gitart-vue-dialog';
import InfoDialog from './InfoDialog.vue';

export default defineComponent({
  setup() {
    const $dialog = inject(dialogInjectionKey);

    const onOpen = () => {
      $dialog.addDialog({
        component: InfoDialog,
        props: {
          info: 'Some kind of message from outside InfoDialog',
        },
      });
    };

    return {
      onOpen,
    };
  },
});
```

</div>

:::info Live Example

<div class="options-api">

See live example [here (stackblitz.com)](https://stackblitz.com/edit/gitart-vue-dialog-plugin-usage?file=src%2Fcomponents%2Foption%2FLauncher.vue)

</div>
<div class="composition-api">

See live example [here (stackblitz.com)](https://stackblitz.com/edit/gitart-vue-dialog-plugin-usage?file=src/components/composition/Launcher.vue)

</div>

Wait until all dependencies will be installed and run `npm run dev` in the terminal below.

:::


As you see, you don't need to insert `<InfoDialog />` into `Launcher.vue`. Now, we can even put `onOpen` method in a separate file and reuse it everywhere. [Here](https://stackblitz.com/edit/gitart-vue-dialog-plugin-usage?file=src%2Fcomponents%2FComposableLauncher.vue) is an example with using composable and composition api.
