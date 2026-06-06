import * as reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import base from './index.js'

/** @type {import("typescript-eslint").Config} */
export default tseslint.config(...base, {
  plugins: {
    react: reactPlugin,
    'react-hooks': reactHooksPlugin,
  },
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    ...reactPlugin.configs.recommended.rules,
    ...reactHooksPlugin.configs.recommended.rules,
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
})
