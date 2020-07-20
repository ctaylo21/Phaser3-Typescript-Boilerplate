module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.eslint.json',
    // Using __dirname to solve this issue:
    // https://github.com/typescript-eslint/typescript-eslint/issues/251
    tsconfigRootDir: __dirname,
  },
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    'arrow-body-style': [2, 'as-needed'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': [0],
        '@typescript-eslint/explicit-module-boundary-types': [0],
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
