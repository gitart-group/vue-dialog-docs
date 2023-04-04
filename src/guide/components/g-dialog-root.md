---
aside: deep
---

# GDialogRoot

```js
import { GDialogRoot } from 'gitart-vue-dialog'
```

## Usage

Put `GDialogRoot` into your root component (App.vue). This is important for the [plugin](/guide/usage/plugin-usage) to work properly.

::: warning
Remember GDialogRoot just render dialogs added by `$dialog.addDialog()`.
The component has no props, slots, events.
:::

## How does it work

The components just render [$dialog.dialogs](/guide/usage/plugin-usage#dialogs) and removes them on `@update:modelValue` event.

```html
<Component
  :is="dialog.component"
  v-for="(dialog) in dialogs"
  :key="dialog.id"
  v-bind="dialog.props"
  @update:modelValue="onClose(id)"
/>
```
- `dialogs` - it's array of the plugin dialogs. Details: [$dialog.dialogs](/guide/usage/plugin-usage#dialogs)
- `onClose` - method that runs [$dialog.removeDialog](/guide/usage/plugin-usage#removedialog-index)

If it's not enough, you can write your alternative.
