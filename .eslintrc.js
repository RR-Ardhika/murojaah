module.exports = {
  plugins: ['@typescript-eslint', 'import'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'react-hooks/exhaustive-deps': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Node "builtin" modules (like fs, path)
          'external', // External packages (like react, lodash)
          'internal', // Internal modules (within the project)
          ['parent', 'sibling', 'index'], // Parent, sibling, and index imports
        ],
        'newlines-between': 'always', // Adds newlines between groups
        alphabetize: {
          order: 'asc', // Sorts within groups alphabetically
          caseInsensitive: true,
        },
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      // Variables: camelCase, UPPER_CASE for constants
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
      },
      // Functions: camelCase
      {
        selector: 'function',
        format: ['camelCase'],
      },
      // Classes, interfaces, and types: PascalCase
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      // Enum members: PascalCase
      {
        selector: 'enumMember',
        format: ['PascalCase'],
      },
      // Properties and methods: camelCase, leading underscores allowed for private members
      {
        selector: 'property',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'method',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      // Static members: camelCase or UPPER_CASE
      {
        selector: 'property',
        modifiers: ['static'],
        format: ['camelCase', 'UPPER_CASE'],
      },
      // Type parameters: PascalCase, prefixed with T
      {
        selector: 'typeParameter',
        format: ['PascalCase'],
        prefix: ['T'],
      },
    ],
    '@typescript-eslint/typedef': [
      'error',
      {
        arrayDestructuring: false,
        arrowParameter: true,
        memberVariableDeclaration: true,
        objectDestructuring: false,
        parameter: true,
        propertyDeclaration: true,
        variableDeclaration: true,
        variableDeclarationIgnoreFunction: true,
      },
    ],
  },
  overrides: [
    {
      files: ['**/component/**/*.{ts,tsx}'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'variable',
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
          },
        ],
      },
    },
  ],
};
