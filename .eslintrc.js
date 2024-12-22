module.exports = {
  plugins: ['@typescript-eslint', 'check-file', 'import'],
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
    'check-file/filename-naming-convention': [
      'error',
      {
        '**/*.{jsx,tsx}': 'PASCAL_CASE',
        '**/*.{js,ts}': 'KEBAB_CASE',
      },
    ],
    'func-style': ['error', 'expression', { allowArrowFunctions: true }],
    'import/no-default-export': 'error', // Enforce named exports only
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
    'prefer-arrow-callback': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
  overrides: [
    {
      files: ['.eslintrc.js', 'tailwind.config.ts'],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['**/index.tsx'],
      rules: {
        'check-file/filename-naming-convention': [
          'error',
          {
            '**/index.tsx': 'KEBAB_CASE',
          },
        ],
      },
    },
    {
      files: ['**/app/**/*.{ts,tsx}', '**/component/**/*.{ts,tsx}'],
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
    {
      files: ['**/app/**/page.{ts,tsx}', '**/app/**/layout.{ts,tsx}'],
      rules: {
        'check-file/filename-naming-convention': [
          'error',
          {
            '**/*.{jsx,tsx}': 'KEBAB_CASE',
            '**/*.{js,ts}': 'KEBAB_CASE',
          },
        ],
        'import/no-default-export': 'off', // Allow default exports for Next.js page and layout components
      },
    },
  ],
};
