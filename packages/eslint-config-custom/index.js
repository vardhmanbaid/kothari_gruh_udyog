module.exports = {
  env: {
    browser: true, // Enable browser global variables
    node: true, // Enable Node.js global variables and Node.js scoping
    es6: true, // Enable ECMAScript 6 features
  },
  parser: '@typescript-eslint/parser', // Use the TypeScript parser
  parserOptions: {
    ecmaVersion: 2021, // Use ECMAScript 2021
    ecmaFeatures: {
      jsx: true, // Enable JSX parsing
    },
  },
  plugins: [
    '@typescript-eslint', // Enable TypeScript support
    'react', // Enable React support
    'react-hooks', // Enable React Hooks support
    'import', // Enable import/export syntax support
    'sonarjs', // Enable SonarJS rules support
    'prettier', // Enable Prettier integration
  ],
  extends: [
    'eslint:recommended', // Use recommended ESLint rules
    'plugin:@typescript-eslint/recommended', // Use recommended TypeScript ESLint rules
    'plugin:react/recommended', // Use recommended React ESLint rules
    'plugin:react-hooks/recommended', // Use recommended React Hooks ESLint rules
    'plugin:import/errors', // Use import/export syntax error rules
    'plugin:import/warnings', // Use import/export syntax warning rules
    'plugin:sonarjs/recommended', // Use recommended SonarJS rules
    'prettier', // Use Prettier recommended rules
  ],
  rules: {
    // Possible Errors
    'no-console': 'off',
    'no-template-curly-in-string': 'warn',
    'no-unused-expressions': 'warn',
    'no-use-before-define': 'off',

    // Best Practices
    'array-callback-return': 'warn',
    'class-methods-use-this': 'off',
    'consistent-return': 'warn',
    'default-case': 'warn',
    'eqeqeq': 'warn',
    'no-empty-function': 'warn',
    'no-eval': 'warn',
    'no-extend-native': 'warn',
    'no-extra-bind': 'warn',
    'no-floating-decimal': 'warn',
    'no-implied-eval': 'warn',
    'no-invalid-this': 'warn',
    'no-lone-blocks': 'warn',
    'no-loop-func': 'warn',
    'no-multi-spaces': 'warn',
    'no-multi-str': 'warn',
    'no-new': 'warn',
    'no-param-reassign': 'warn',
    'no-return-assign': 'warn',
    'no-script-url': 'warn',
    'no-self-compare': 'warn',
    'no-sequences': 'warn',
    'no-throw-literal': 'warn',
    'no-unmodified-loop-condition': 'warn',
    'no-unused-labels': 'warn',
    'no-useless-call': 'warn',
    'no-useless-concat': 'warn',
    'no-useless-return': 'warn',
    'no-void': 'warn',
    'prefer-promise-reject-errors': 'warn',
    'wrap-iife': ['warn', 'inside'],

    // Variables
    'no-shadow': 'warn',
    'no-shadow-restricted-names': 'warn',
    'no-undef': 'off',
    'no-unused-vars': 'warn',

    // Stylistic Issues
    'camelcase': 'warn',
    'comma-spacing': 'warn',
    'eol-last': 'warn',
    'func-call-spacing': 'warn',
    'indent': ['warn', 2],
    'key-spacing': 'warn',
    'keyword-spacing': 'warn',
    'no-multiple-empty-lines': 'warn',
    'no-trailing-spaces': 'warn',
    'object-curly-spacing': ['warn', 'always'],
    'prefer-template': 'off',
    'quotes': ['warn', 'single'],
    'semi': ['warn', 'always'],
    'space-before-blocks': 'warn',
    'space-in-parens': 'warn',
    'space-infix-ops': 'warn',
    'spaced-comment': ['warn', 'always'],

    // ECMAScript 6
    'arrow-parens': ['warn', 'always'],
    'arrow-spacing': 'warn',
    'generator-star-spacing': ['warn', 'after'],
    'no-duplicate-imports': 'warn',
    'no-useless-computed-key': 'warn',
    'no-useless-constructor': 'warn',
    'no-useless-rename': 'warn',
    'rest-spread-spacing': 'warn',
    'template-curly-spacing': 'warn',
    'yield-star-spacing': ['warn', 'after'],

    // React
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',

    // React Hooks
    'react-hooks/exhaustive-deps': 'off',

    // Import
    'import/no-unresolved': 'off',
    'import/named': 'off',

    // SonarJS
    'sonarjs/cognitive-complexity': 'off',
    'sonarjs/no-duplicate-string': 'off',
    'sonarjs/no-identical-functions': 'off',
    'sonarjs/no-redundant-jump': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
