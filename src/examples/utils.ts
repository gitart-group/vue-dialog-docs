import { onBeforeUnmount } from 'vue'

export type ExampleData = {
  [key: string]: string | Record<string, string>
} & {
  'import-map.json'?: string
}

function indent(str: string): string {
  return str
    .split('\n')
    .map((l) => (l.trim() ? `  ${l}` : l))
    .join('\n')
}

function deindent(str: string, tabsize = 2): string {
  return str
    .split('\n')
    .map((l) => l.replace(tabsize === 1 ? /^\s{2}/ : /^\s{4}/, ''))
    .join('\n')
}

function toKebabTags(str: string): string {
  return str.replace(/(<\/?)([A-Z]\w+)(\s|>)/g, (_, open, tagName, end) => {
    return open + tagName.replace(/\B([A-Z])/g, '-$1').toLowerCase() + end
  })
}

function toScriptSetup(src: string, template: string): string {
  const exportDefaultIndex = src.indexOf('export default')
  const lastReturnIndex = src.lastIndexOf('return {')

  let setupCode =
    lastReturnIndex > -1
      ? deindent(
          src
            .slice(exportDefaultIndex, lastReturnIndex)
            .replace(/export default[^]+?setup\([^)]*\)\s*{/, '')
            .trim()
        )
      : ''

  const propsStartIndex = src.indexOf(`\n  props:`)
  if (propsStartIndex > -1) {
    const propsEndIndex = src.indexOf(`\n  }`, propsStartIndex) + 4
    const propsVar =
      /\bprops\b/.test(template) || /\bprops\b/.test(src)
        ? `const props = `
        : ``
    const propsDef = deindent(
      src
        .slice(propsStartIndex, propsEndIndex)
        .trim()
        .replace(/,$/, '')
        .replace(/^props: /, `${propsVar}defineProps(`) + ')',
      1
    )
    setupCode = (propsDef + '\n\n' + setupCode).trim()
  }

  return src.slice(0, exportDefaultIndex) + setupCode + '\n'
}

function forEachComponent(
  raw: ExampleData,
  files: Record<string, string>,
  cb: (filename: string, file: Record<string, string>) => void
) {
  for (const filename in raw) {
    const content = raw[filename]
    if (filename === 'description.txt' || filename === 'description.md') {
      continue
    } else if (typeof content === 'string') {
      files[filename] = content
    } else {
      const {
        'template.html': template,
        'composition.js': composition,
        'options.js': options,
        'style.css': style
      } = content
      cb(filename, { template, composition, options, style })
    }
  }
}

function injectCreateApp(src: string): string {
  const importVueRE = /import {(.*?)} from 'vue'/
  if (importVueRE.test(src)) {
    src = src.replace(importVueRE, `import { createApp,$1} from 'vue'`)
  } else {
    const newline = src.startsWith(`import`) ? `\n` : `\n\n`
    src = `import { createApp } from 'vue'${newline}${src}`
  }
  return src.replace(/export default ({[^]*\n})/, "createApp($1).mount('#app')")
}

export function resolveSFCExample(
  raw: ExampleData,
  preferComposition: boolean
) {
  const files: Record<string, string> = {}
  forEachComponent(
    raw,
    files,
    (filename, { template, composition, options, style }) => {
      const desc = raw['description.txt']
      let sfcContent =
        desc && filename === 'App' ? `<!--\n${desc}\n-->\n\n` : ``
      if (preferComposition) {
        sfcContent += `<script setup>\n${toScriptSetup(
          composition,
          template
        )}<\/script>`
      } else {
        sfcContent += `<script>\n${options}<\/script>`
      }
      sfcContent += `\n\n<template>\n${indent(template)}</template>`
      if (style) {
        sfcContent += `\n\n<style>\n${style}</style>`
      }
      files[filename + '.vue'] = sfcContent
    }
  )
  return files
}

export function onHashChange(cb: () => void) {
  window.addEventListener('hashchange', cb)
  onBeforeUnmount(() => {
    window.removeEventListener('hashchange', cb)
  })
}
