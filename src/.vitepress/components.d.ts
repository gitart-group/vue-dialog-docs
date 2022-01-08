
declare module 'vue' {
  export interface GlobalComponents {
    GDialog: typeof import('gitart-vue-dialog')['GDialog']
    GDialogRoot: typeof import('gitart-vue-dialog')['GDialogRoot'] 
  }
}

export { }
