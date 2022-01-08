/**
 * Composable to extract partitions (template, script, style) from the vue component
 */

export interface IPen {
  template: string
  script: string
  style: string
}

const parseTemplate = (
  target: string,
  template: string,
): string => {
  const string = `(<${target}(.*)?>[\\w\\W]*<\\/${target}>)`
  const regex = new RegExp(string, 'g')
  const parsed = regex.exec(template) || []

  return parsed[1] || ''
}

export const usePen = (file: string): IPen => {
  const template = parseTemplate('template', file)
  const script = parseTemplate('script', file)
  const style = parseTemplate('style', file)

  return {
    template,
    script,
    style,
  }
}
