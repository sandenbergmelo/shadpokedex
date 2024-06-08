module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended',
    '@rocketseat/eslint-config/react'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'src/components/ui', 'src/lib/utils.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import-newlines'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import-newlines/enforce': ['warn', { items: 40, 'max-len': 80 }],
    'tailwindcss/classnames-order': 'warn',
  },
}
