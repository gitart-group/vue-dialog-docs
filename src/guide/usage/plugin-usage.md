---
aside: deep
---

# Plugin Usage

The plugin for the Gitart Dialog is **completely optional**. It's only needed
if you want adding dialogs by the method [addDialog](/guide/usage/plugin-usage#adddialog-data) not
including the dialog in the template of some component.

## Installation


```js
// main.js
import { plugin as dialogPlugin } from 'gitart-vue-dialog'

const app = Vue.createApp(/* ... */)
app.use(dialogPlugin, {
  // options
})
```

### Plugin options

#### `closeDelay`
- **Type:** `Number`

- **Default:** `500`

- **Details:** <br/>
  It's time in milliseconds after the dialog is closed when the dialogs are removed from the DOM.
  If you want a long leaving transition, set this value higher.

---

#### `props`
- **Type:** `Object`

- **Default:** `{}`

- **Details:** <br/>
  It's default props for all dialogs if you run them by `addDialog` method.

  ```ts
  app.use(dialogPlugin, {
    props: {
      maxWidth: '300px',
      // ...
    },
  })

  // You can override it
  $dialog.addDialog({
    component: InfoDialog,
    props: {
      maxWidth: '500px',
    },
  })
  ```

  ```ts
  // It works like this
  const defaultProps = options?.props ?? {}

  const $dialog = {
    addDialog: ({ component, props, id }, hooks) => {
      const dialogId = id ?? Date.now() + Math.random()

      dialogs.push({
        component,
        id: dialogId,

        props: reactive({
          modelValue: true,
          ...defaultProps,
          ...props,
        }),

        onClose: hooks?.onClose,
      })

      return dialogId
    },
  }
  ```

---

### GDialogRoot
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

### `addDialog(data, hooks)`

- **Type:** `Function`

- **Arguments:**
  - {Object} data - <code>{component: DialogComponent, props?: { ... }, id?: string | number }</code>
  - {Object} hooks - <code>{ onClose: (event) => void }</code>

- **Returns:** `Number` - dialog id

- **Details:** <br/>
  The method adds your extended `data` argument to [dialogs](#dialogs) array.
  The `data.component` will be rendered in the [GDialogRoot](/guide/components/g-dialog-root) with the props you add to `data.props`

  Optionaly you can add `id` to the `data` argument. It's useful if you want to remove the dialog by id.

  ```js
  const dialogId = $dialog.addDialog({
    component: InfoDialog,
    props: {
      maxWidth: '500px',
    },
    id: 'my-dialog-id',
  })

  // ...

  $dialog.removeDialog(dialogId)
  ```

  The `hooks` argument is an object with the `onClose` method. It's called when the dialog is closing.
  It allows you to do something before the dialog is closed or cancel the closing.

  ```js
  $dialog.addDialog({
    component: InfoDialog,
    props: {
      maxWidth: '500px',
    },
  }, {
    onClose: (event) => {
      event.cancel() // cancel the closing
      event.id // dialog id
      event.item // dialog item from $dialog.dialogs (read more below)
    },
  })
  ```

  ::: warning
    `data.props` should not contain modelValue. The `addDialog` overwrites it
  :::

  ::: info
  To close the dialog (DialogComponent.vue) you need inside emit the event `update:modelValue` with `false` inside. Take a look at the [example](#example) below
  :::

---

### `removeDialog(id)` 

- **Type:** `Function`

- **Arguments:**
  - {Number} id

- **Details:** <br/>
  The method removes item from [dialogs](#dialogs) by id. Useful if you want to close the dialog programmatically.

  ```js
  const dialogId = $dialog.addDialog({
    component: InfoDialog,
    props: {
      maxWidth: '500px',
    },
    id: 'my-dialog-id',
  })

  // ...

  $dialog.removeDialog(dialogId)
  ```


  With it you can also write your own [GDialogRoot](/guide/components/g-dialog-root)
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

    onClose?: (event: {
      cancel: () => void
      id: number
      item: IDialogItem
    }) => void
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
<GDialog v-model="dialogState" max-width="300">
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
      }, {
        onClose: (event) => {
          console.log('Dialog is closing')
          console.log(event)
          // event.cancel()
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
      }, {
        onClose: (event) => {
          console.log('Dialog is closing')
          console.log(event)
          // event.cancel()
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
