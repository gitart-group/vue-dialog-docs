import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vitepress'
import baseConfig from '@vue/theme/config'
import WindiCSS from 'vite-plugin-windicss'
import { headerPlugin } from './headerMdPlugin'

const nav = [
  {
    text: 'Quick Start',
    link: '/guide/quick-start',
  },
  {
    text: 'Usage',
    link: '/guide/usage/component-usage',
  },
  {
    text: 'Examples',
    items: [
      {
        text: 'Editable',
        link: '/examples/',
      },
      {
        text: 'Advanced',
        link: 'https://michaelgitart.github.io/gitart-vue-dialog/',
      },
    ]
  },
  {
    text: 'NPM',
    link: 'https://www.npmjs.com/package/gitart-vue-dialog',
  },
]

export const sidebar = {
  '/guide/': [
    {
      text: 'Getting Started',
      items: [
        {
          text: 'Introduction',
          link: '/guide/introduction',
        },
        {
          text: 'Quick Start',
          link: '/guide/quick-start',
        },
        {
          text: 'Typescript',
          link: '/guide/typescript',
        },
      ],
    },
    {
      text: 'Usage',
      items: [
        {
          text: 'Component Usage',
          link: '/guide/usage/component-usage',
        },
        {
          text: 'Plugin Usage',
          link: '/guide/usage/plugin-usage',
        },
      ],
    },
    {
      text: 'Components',
      items: [
        {
          text: 'GDialog',
          link: '/guide/components/g-dialog',
        },
        {
          text: 'GDialogRoot',
          link: '/guide/components/g-dialog-root',
        },
      ],
    },
  ],
  '/examples/': [
    {
      text: 'Basic',
      items: [
        {
          text: 'Hello World',
          link: '/examples/#hello-world'
        },
      ]
    },
  ],
}

export default defineConfig({
  extends: baseConfig,

  lang: 'en-US',
  title: 'Gitart Vue Dialog',
  description: 'Documentation for Gitart Vue Dialog. Docs',

  head: [
    [
      'script',
      {},
      fs.readFileSync(
        path.resolve(
          __dirname,
          './inlined-scripts/restorePreference.js',
        ),
        'utf-8',
      ),
    ],
  ],

  markdown: {
    config(md) {
      md.use(headerPlugin)
    },
  },

  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/MichaelGitArt/gitart-vue-dialog',
      },
    ],

    nav,
    sidebar,

    footer: {
      license: {
        text: 'MIT License',
        link: 'https://opensource.org/licenses/MIT',
      },
      copyright: 'Copyright © 2021-present Michael Gitart',
    },
  },

  vite: {
    plugins: [
      WindiCSS({
        configFiles: [
          path.resolve(__dirname, 'windi.config.ts'),
        ],
      }),
    ],
    define: {
      __VUE_OPTIONS_API__: false,
    },
    optimizeDeps: {
      exclude: ['@vue/repl'],
    },
    // @ts-ignore
    ssr: {
      external: ['@vue/repl'],
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ['../..'],
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../'),
        '@theme-components': path.resolve(__dirname, '../.vitepress/theme/components'),
      },
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: Infinity,
      rollupOptions: {
        output: {
          manualChunks(id, ctx) {
            if (id.includes('gsap')) {
              return 'gsap'
            }
            return moveToVendor(id, ctx)
          },
        },
      },
    },
    json: {
      stringify: true,
    },
  },

  vue: {
    reactivityTransform: true,
    template: {
      compilerOptions: {
        directiveTransforms: {
          focus: () => ({ props: [] }),
        },
      },
    },
  },
})

const cache = new Map<string, boolean>()

/**
 * This is temporarily copied from Vite - which should be exported in a
 * future release.
 *
 * @TODO when this is exported by Vite, VitePress should ship a better
 * manual chunk strategy to split chunks for deps that are imported by
 * multiple pages but not all.
 */
function moveToVendor(id: string, { getModuleInfo }: any) {
  if (
    id.includes('node_modules') &&
    !/\.css($|\\?)/.test(id) &&
    staticImportedByEntry(id, getModuleInfo, cache)
  ) {
    return 'vendor'
  }
}

function staticImportedByEntry(
  id: string,
  getModuleInfo: any,
  cache: Map<string, boolean>,
  importStack: string[] = [],
): boolean {
  if (cache.has(id)) {
    return cache.get(id) as boolean
  }
  if (importStack.includes(id)) {
    // circular deps!
    cache.set(id, false)
    return false
  }
  const mod = getModuleInfo(id)
  if (!mod) {
    cache.set(id, false)
    return false
  }

  if (mod.isEntry) {
    cache.set(id, true)
    return true
  }
  const someImporterIs = mod.importers.some(
    (importer: string) =>
      staticImportedByEntry(
        importer,
        getModuleInfo,
        cache,
        importStack.concat(id),
      ),
  )
  cache.set(id, someImporterIs)
  return someImporterIs
}
