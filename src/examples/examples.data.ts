import fs from 'fs'
import path from 'path'
import { ExampleData } from './utils'

export declare const data: Record<string, ExampleData>

export { ExampleData }

export default {
  watch: 'src/**',
  load() {
    const srcDir = path.resolve(__dirname, './src')
    return readExamples(srcDir)
  },
}

export function readExamples(
  srcDir: string,
): Record<string, ExampleData> {
  const examples = fs.readdirSync(srcDir)
  const data: Record<string, ExampleData> = {}
  for (const name of examples) {
    data[name] = readExample(path.join(srcDir, name))
  }
  return data
}

function readExample(dir: string): ExampleData {
  const filenames = fs.readdirSync(dir)
  const files: ExampleData = {}
  for (const filename of filenames) {
    const fullPath = path.join(dir, filename)
    if (fs.statSync(fullPath).isDirectory()) {
      files[filename] = readComponentDir(fullPath)
    } else {
      files[filename] = fs.readFileSync(fullPath, 'utf-8')
    }
  }
  return files
}

function readComponentDir(
  dir: string,
): Record<string, string> {
  const filenames = fs.readdirSync(dir)
  const files: Record<string, string> = {}
  for (const filename of filenames) {
    let content = fs.readFileSync(
      path.join(dir, filename),
      'utf-8',
    )
    if (!content.endsWith('\n')) content += '\n'
    files[filename] = content
  }

  const startCSS = `@import 'https://cdn.jsdelivr.net/npm/gitart-vue-dialog@1.2.1/dist/style.css';\n\n`

  if (!files['style.css']) {
    files['style.css'] = startCSS
  } else {
    files['style.css'] = startCSS + files['style.css']
  }

  return files
}
