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
    // '@typescript-eslint/naming-convention': [
    //   'error',
    //   {
    //     selector: 'variable',
    //     format: ['camelCase'],
    //   },
    //   {
    //     selector: 'function',
    //     format: ['camelCase'],
    //   },
    //   {
    //     selector: 'class',
    //     format: ['PascalCase'],
    //   },
    //   {
    //     selector: 'typeLike',
    //     format: ['PascalCase'],
    //   },
    // ],
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
};
