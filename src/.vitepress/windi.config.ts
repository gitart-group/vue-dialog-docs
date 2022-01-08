import path from 'path'
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  preflight: false,
  shortcuts: {
    'btn': 'inline-flex items-center justify-center py-2 px-5 rounded-lg transition bg-gray-100 hover:bg-gray-200 :dark:bg-gray-400 dark:bg-opacity-20 dark:hover:bg-opacity-40',
    'btn--primary': 'bg-primary hover:bg-primary-dark text-white font-semibold dark:bg-green-600 dark:hover:bg-green-500 dark:text-black',
    'btn--outline-gray': 'border-1 border-solid border-gray-300',
  },
  extract: {
    include: [
      path.resolve(__dirname, './**/*.vue'),
      path.resolve(__dirname, '../**/*.{vue,html,md}'),
    ],
    exclude: ['node_modules', '.git']
  },
  theme: {
    extend: {
      colors: {
        primary: 'var(--vt-c-green)', 
        'primary-dark': 'var(--vt-c-green-dark)', 
      },
    }
  }
})
