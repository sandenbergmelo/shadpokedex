import js from '@eslint/js'
import baseConfig from '@rocketseat/eslint-config/react.mjs'
import importNewLines from 'eslint-plugin-import-newlines'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig(
  { ignores: ['dist', 'src/components/ui', 'src/lib/utils.ts'] },
  {
    extends: [
      ...baseConfig,
      js.configs.recommended,
      ...tseslint.configs.recommended,
      // ...tailwind.configs["flat/recommended"]
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-refresh': reactRefresh,
      'import-newlines': importNewLines
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'import-newlines/enforce': ['warn', { items: 40, 'max-len': 80 }],
    },
  },
)
