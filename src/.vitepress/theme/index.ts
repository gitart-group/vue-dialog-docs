import { h, App } from 'vue'
import { VPTheme, VTBadge } from '@vue/theme'
import PreferenceSwitch from './components/PreferenceSwitch.vue'
import {
  preferComposition,
  preferSFC,
  filterHeadersByPreference,
} from './components/preferences'
import './styles/badges.css'
import './styles/utilities.css'
import './styles/inline-demo.css'
import './styles/options-boxes.css'
import './styles/vars.css'

import 'virtual:windi.css'
import 'gitart-vue-dialog/dist/style.css'
import {
  GDialog,
  plugin as dialogPlugin,
} from 'gitart-vue-dialog'

export default Object.assign({}, VPTheme, {
  Layout: () => {
    // @ts-ignore
    return h(VPTheme.Layout, null, {
      'sidebar-top': () => h(PreferenceSwitch),
    })
  },
  enhanceApp({ app }: { app: App }) {
    app.use(dialogPlugin)
    app.component('Badge', VTBadge)
    app.component('GDialog', GDialog)
    app.provide('prefer-composition', preferComposition)
    app.provide('prefer-sfc', preferSFC)
    app.provide('filter-headers', filterHeadersByPreference)
  },
})
