import { getHighlighter, setCDN, toShikiTheme } from 'shiki'
import themeJson from 'shiki/themes/material-palenight.json'
const theme = toShikiTheme(themeJson as any)

export type HighlightLang =
  | 'html'
  | 'js'
  | 'vue-html'
  | 'scss'
  | 'vue'

const defaultLangs: HighlightLang[] = ['html', 'js']

export const useHighlighter = async (
  langs: HighlightLang[] = defaultLangs,
) => {
  await setCDN('https://unpkg.com/shiki/')
  const highlighter = await getHighlighter({
    theme,
    langs,
  })

  return highlighter
}
