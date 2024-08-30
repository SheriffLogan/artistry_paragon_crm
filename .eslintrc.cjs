module.exports = {
  env: {
    browser: true,
    es2022: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: { 
    ecmaVersion: 'latest', 
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true  // If you are using React, enable JSX
    }
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn'
  },
  overrides: [
    {
      files: ['**/*.cjs'],
      env: {
        node: true
      }
    }
  ]
}
