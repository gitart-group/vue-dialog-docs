---
aside: deep
---

# GDialog

```js
import { GDialog } from 'gitart-vue-dialog'
```

The component uses the Vue 3 teleport to move the component html to `<body>`.

z-index of the component is 200. So be careful. Don't make z-index of the header or other element like this: <br/> `z-index: 9999` 

## Props

| Name | Type | Default |
|:---|:---|:---|
| [background](#background) | `boolean` `string` | `true` |
| [border-radius](#border-radius) | `boolean` `number` `string` | `true` |
| [content-class](#content-class) | `string` | `''` |
| [depressed](#depressed) | `boolean` | `false` |
| [fullscreen](#fullscreen) | `boolean` | `false` |
| [height](#height) |  `string` `number` | `'auto'` |
| [local](#local) | `boolean` | `false` |
| [max-width](#max-width) | `string` `number` | `'none'` |
| [model-value](#model-value) | `boolean` | `false` |
| [overlay-background](#overlay-background) | `boolean` `string` | `true` |
| [persistent](#persistent) | `boolean` | `false` |
| [scrollable](#scrollable) | `boolean` | `false` |
| [transition](#transition) | `string` | `g-dialog-transition` |
| [width](#width) | `string` `number` | `'auto'` |


### `background`
- **Type:** `Boolean | String`

- **Default:** `true`

- **Details:** <br/>
  Sets background to the dialog content

  - `true` - remains [default](#content-bg) background, 
  - `false` - removes background
  - `String` - sets some background to the current dialog content

  You can set default value for all dialogs by CSS var [--g-dialog-content-bg](#content-bg)

---

### `border-radius`
- **Type:** `Boolean | Number | String`

- **Default:** `true`

- **Details:** <br/>
  Sets border-radius to the dialog content

  - `true` - remains [default](#content-border-radius) border-radius, 
  - `false` - removes border-radius
  - `String` - sets some border-radius to the current dialog content

  You can set default value for all dialogs by CSS var [--g-dialog-content-border-radius](#content-border-radius)

---

### `content-class`
- **Type:** `String`

- **Details:** <br/>
Applies the class to the content (div that wraps the main slot)

---


### `depressed`
- **Type:** `Boolean`

- **Default:** `false`

- **Details:** <br/>
Disables default box-shadow

---

### `fullscreen`
- **Type:** `Boolean`

- **Default:** `false`

- **Details:** <br/>
  Enables a fullscreen mode for the dialog.

  [Example](/guide/usage/component-usage#fullscreen).

---

### `height`
- **Type:** `String | Number`

- **Default:** `'auto'`

- **Details:** <br/>
Sets height for the dialog

---
### `local`
- **Type:** `Boolean`

- **Default:** `false`

- **Details:** <br/>
  Enables the local mode. The dialog will not be teleported to the body and will be positioned like `absolute` instead of `fixed`.
  Be sure to specify `position: relative;` for the parent element where you place the dialog.

  The props can be useful if you want to show some windows above a specific part of your app.

  [Example](/guide/usage/component-usage#local).

  `v1.2.0+`

---

### `max-width`
- **Type:** `String | Number`

- **Default:** `'none'`

- **Details:** <br/>
Sets max-width for the dialog

---

### `model-value`
- **Type:** `Boolean`

- **Default:** `false`

- **Details:** <br/>
v-model props to activate and deactivate the dialog

---

### `overlay-background`
- **Type:** `Boolean | String`

- **Default:** `true`

- **Details:** <br/>
  Sets dialog overlay background. 
  - `true` - remains [default](#overlay-bg) background, 
  - `false` - removes background
  - `String` - sets some background to the current dialog overlay

  You can set default value for all dialogs by CSS var [--g-dialog-overlay-bg](#overlay-bg)

---

### `persistent`
- **Type:** `Boolean`

- **Default:** `false`

- **Details:** <br/>
  Makes clicking outside of the element will not deactivate the dialog. [Example](/guide/usage/component-usage#persistent).

---

### `scrollable`
- **Type:** `Boolean`

- **Default:** `false`

- **Details:** <br/>
Applies the `display: flex;` to the dialog content wrapper element. It allows you to implement scrollable content to a specific part of a dialog.
[Here](/guide/usage/component-usage#scrollable) is an example of use.

---
### `transition`
- **Type:** `String`

- **Default:** `'g-dialog-transition'`

- **Details:** <br/>
  Sets the component custom transition name (leaving and entering the dialog).

  [Example](/guide/usage/component-usage#transition).


  ```scss
  // transition="custom-rotate-transition"
  .custom-rotate-transition {
    &-enter-active,
    &-leave-active {
      transition-timing-function: linear;
      transition-duration: 0.1s; // not higher than 200ms
    }

    &-enter-from {
      transform: translate(0, 30px) rotate(12deg);
      opacity: 0;
    }

    &-leave-to {
      transform: translate(0, 30px) rotate(4deg);
      opacity: 0;
    }
  }
  ```

  ::: warning
    On leaving don't set `transition-duration` higher than `150ms`-`200ms` if you are using
    plugin method [addDialog](/guide/usage/plugin-usage#adddialog-data).

    [removeDialog](/guide/usage/plugin-usage#removedialog-index) disables a dialog and deletes it after 150ms
    completely, so the custom transition may be truncated
  :::

---
### `width`
- **Type:** `String | Number`

- **Default:** `'auto'`

- **Details:** <br/>
Sets width for the dialog

---

## Slots

| Name | Description |
|:---|:---|
| default | The default Vue slot |
| activator | When used, will activate the component when clicked |

### `default`
- **Scoped Data:**

    ```js
    {
      onClose: () => {}
    }
    ```

- **Details:** 

  The prop is for your content.
  
  `onClose` scoped data could help close a dialog.

  ```html
  <GDialog>
    <template #default="{ onClose }">
      <p>Content</p>
    
      <button @click="onClose">
        close
      </button>
    </template>
  </GDialog>
  ```

---

### `activator`
- **Scoped Data:**

    ```js
    {
      onClick: () => {}
    }
    ```

- **Details:**

  The slot helps activate the component when clicked on inside element. Bind scoped data to the button.

  ```html
  <GDialog>
    <template #activator="attrs">
      <button v-bind="attrs">
        open
      </button>
    </template>

    Content
  </GDialog>
  ```

  Or you can call `onClick` manually with another event.

  ```html
  <GDialog>
    <template #activator="{ onClick }">
      <button @mouseenter="onClick">
        open
      </button>
    </template>

    Content
  </GDialog>
  ```

---

## Events

| Name | Payload | Description |
|:---|:---|:---|
| `update:modelValue` | `boolean` | runs with `false` after clicking outside

## CSS Vars Customization

The packages provide global style customization by CSS variables. Below you can see all possible variables.
Just put them in your global CSS file. Like this:

```css
:root {
  --g-dialog-content-bg: #eff1f3;
  --g-dialog-content-border-radius: 8px;
}
```

**List of possible variables:**

### content-bg
- **Name:** `--g-dialog-content-bg`

- **Default:** `#fff`

- **Details:** <br/>
  Sets default `background` for the dialog content

- **Usage:**

  ```css
  --g-dialog-content-bg: #282c34;
  ```

---

### content-border-radius
- **Name:** `--g-dialog-border-radius`

- **Default:** `4px`

- **Details:**<br/>
  Sets default `border-radius` for the dialog content

- **Usage:**

  ```css
  --g-dialog-border-radius: 0;
  ```
---

### content-shadow
- **Name:** `--g-dialog-content-shadow`

- **Default:** <br/>
  `0 11px 15px -7px rgb(0 0 0 / 20%),` <br/>
  `0 24px 38px 3px rgb(0 0 0 / 14%),` <br/>
  `0 9px 46px 8px rgb(0 0 0 / 12%)` <br/>

- **Details:**<br/>
  Sets default `box-shadow` for the dialog content

- **Usage:**

  ```css
  --g-dialog-content-shadow: 0 11px 15px -7px rgb(0 0 0 / 20%);
  ```
---

### overlay-bg
- **Name:** `--g-dialog-overlay-bg`

- **Default:** `rgba(33, 33, 33, 0.46)`

- **Details:**<br/>
  Sets default `background` for the dialog overlay

- **Usage:**

  ```css
  --g-dialog-overlay-bg: rgba(143, 108, 249, 0.4);
  ```
---