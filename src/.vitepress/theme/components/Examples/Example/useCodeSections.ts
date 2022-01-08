import { useAsyncState } from '@vueuse/core'
import { useHighlighter, HighlightLang } from '../../../composable/highlighter'
import { IPen } from '../../../composable/pen'

export interface ISection {
  key: keyof IPen
  label: string
  langLabel: string
  html: string
}

interface ISectionDesc {
  key: keyof IPen
  label: string
  lang: HighlightLang
  langLabel: string
}

const sectionsDesc: ISectionDesc[] = [
  {
    key: 'template',
    label: 'Template',
    lang: 'vue-html',
    langLabel: 'html',
  },
  {
    key: 'script',
    label: 'Script',
    lang: 'js',
    langLabel: 'js',
  },
  {
    key: 'style',
    label: 'Style',
    lang: 'scss',
    langLabel: 'scss',
  },
]

const trimSectionTag = (baseCode: string) => {
  let code = baseCode

  const wrappers = {
    before: '',
    after: '',
  }

  const beforeIndex = code.indexOf('\n') + 1
  wrappers.before = code.substring(0, beforeIndex)
  code = code.substring(beforeIndex)

  const afterIndex = code.lastIndexOf('\n')
  wrappers.after = code.substring(afterIndex + 1)
  code = code.substring(0, afterIndex + 1)

  return {
    code,
    ...wrappers,
  }
}

export const useCodeSections = (pen: Partial<IPen>) => {
  const baseSections: ISection[] = []
  sectionsDesc.forEach(({ langLabel, key, label }) => {
    const code = pen[key]
    if (!code) return
    baseSections.push({
      key,
      langLabel,
      label,
      html: code,
    })
  })

  const { isLoading, state: sections } = useAsyncState<ISection[]>(async () => {
    const sections: ISection[] = []

    const neededLangs = sectionsDesc.reduce<HighlightLang[]>(
      (arr, { key, lang }) => {
        if (pen[key] && !arr.includes(lang)) arr.push(lang)

        return arr
      },
      [],
    )
    const highlighter = await useHighlighter(neededLangs)

    sectionsDesc.forEach(({ lang, langLabel, key, label }) => {
      const code = pen[key]
      if (!code) return

      const { code: trimmedCode, after, before } = trimSectionTag(code)

      const innerHtml = highlighter.codeToHtml(trimmedCode, {
        lang,
      })

      const beforeHtml = highlighter.codeToHtml(before, {
        lang: 'vue-html',
      })
      const afterHtml = highlighter.codeToHtml(after, {
        lang: 'vue-html',
      })

      const html = `${beforeHtml}${innerHtml}${afterHtml}`

      sections.push({
        key,
        langLabel,
        label,
        html,
      })
    })

    return sections
  }, baseSections)

  return {
    sections,
    isLoading,
  }
}
