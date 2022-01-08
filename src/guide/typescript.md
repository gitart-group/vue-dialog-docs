# Typescript

By default, all imported items have types. You need to declare a module for using the [plugin](/guide/usage/plugin-usage) with options api. 

Create a `.d.ts` file and include there following:

```ts
import { IDialog } from 'gitart-vue-dialog'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dialog: IDialog
  }
}
```
Make sure your `.d.ts` file is included by `tsconfig.json`.

Well, that's all :) You can reach plugin methods by `this.$dialog` and it is type-safe.