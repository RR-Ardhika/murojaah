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
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      // Functions: camelCase
      {
        selector: 'function',
        format: ['camelCase'],
      },
      // Enum: PascalCase
      {
        selector: 'enum',
        format: ['PascalCase'],
      },
      // Enum members: PascalCase
      {
        selector: 'enumMember',
        format: ['PascalCase'],
      },
      {
        selector: 'method',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      // Properties and methods: camelCase, leading underscores allowed for private members
      {
        selector: 'property',
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
      },
      // Classes, interfaces, and types: PascalCase
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      // Type parameters: PascalCase, prefixed with T
      {
        selector: 'typeParameter',
        format: ['PascalCase'],
        prefix: ['T'],
      },
      // Variables: camelCase, UPPER_CASE for constants
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
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
    // 'func-style': ['error', 'expression', { allowArrowFunctions: true }],
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
    // 'prefer-arrow-callback': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
  overrides: [
    {
      files: ['**/app/**/*.{ts,tsx}', '**/component/**/*.{ts,tsx}', '**/context/**/*.{ts,tsx}'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'variable',
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
            modifiers: ['exported'],
          },
        ],
      },
    },
  ],
};
