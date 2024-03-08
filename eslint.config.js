// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: ['.DS_Store', '*.d.ts'],
    rules: {
      'no-console': 'off',
      'symbol-description': 'off',
      'curly': ['error', 'all'],
      'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'vue/custom-event-name-casing': ['error', 'kebab-case'],
      'vue/max-attributes-per-line': ['error', { singleline: 5, multiline: 1 }],
    },
  },
)
