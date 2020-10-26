/*
👋 Hi! This file was autogenerated by tslint-to-eslint-config.
https://github.com/typescript-eslint/tslint-to-eslint-config

It represents the closest reasonable ESLint configuration to this
project's original TSLint configuration.

We recommend eventually switching this configuration to extend from
the recommended rulesets in typescript-eslint. 
https://github.com/typescript-eslint/tslint-to-eslint-config/blob/master/docs/FAQs.md

Happy linting! 💖
*/

const coreESLintRules = {
  'array-bracket-spacing': 'error',
  'array-element-newline': ['error', 'consistent'],
  'block-spacing': 'error',
  // 'camelcase': 'warn',
  'comma-dangle': ['error', 'always-multiline'],
  'comma-spacing': 'error',
  'comma-style': 'error',
  'computed-property-spacing': 'error',
  'eol-last': 'error',
  'func-call-spacing': 'error',
  'id-denylist': [
    'error',
    'any',
    'Number',
    'number',
    'String',
    'string',
    'Boolean',
    'boolean',
    'Undefined',
    'undefined',
  ],
  'id-length': [
    'error',
    {
      min: 1,
      max: 32,
    },
  ],
  'jsx-quotes': 'error',
  'key-spacing': 'error',
  'keyword-spacing': 'error',
  'linebreak-style': 'error',
  'lines-between-class-members': 'error',
  'max-depth': 'error',
  'max-lines': 'error', // default file length 300
  'max-nested-callbacks': ['error', 3], // default max is 10 callbacks
  'max-params': 'error',
  'max-statements-per-line': 'error',
  'multiline-comment-style': 'warn',
  'new-parens': 'error',
  'newline-per-chained-call': 'error',
  'no-array-constructor': 'error',
  'no-bitwise': 'error',
  'no-label-var': 'error',
  'no-lonely-if': 'error',
  'no-mixed-operators': 'error',
  'no-multi-assign': 'error',
  'no-multiple-empty-lines': ['error', { max: 1 }],
  'no-negated-condition': 'error',
  'no-nested-ternary': 'error',
  'no-new-object': 'error',
  'no-plusplus': 'error',
  'no-shadow': ['error', { hoist: 'all' }],
  'no-tabs': 'error',
  'no-trailing-spaces': 'error',
  'no-undef-init': 'error',
  'no-underscore-dangle': 'error',
  'no-unneeded-ternary': 'error',
  'no-whitespace-before-property': 'error',
  'object-curly-spacing': ['error', 'always'],
  'padded-blocks': ['error', 'never'],
  'quotes': ['error', 'single', { avoidEscape: true }],
  'semi': 'error',
  'semi-spacing': 'error',
  'semi-style': 'error',
  'sort-keys': 'error',
  'space-before-blocks': 'error',
  'space-in-parens': 'error',
  'space-infix-ops': 'error',
  'space-unary-ops': 'error',
  'spaced-comment': 'error',
  'switch-colon-spacing': 'error',
};

module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    'eslint-plugin-jsdoc',
    'eslint-plugin-prefer-arrow',
    'eslint-plugin-import',
    'eslint-plugin-react',
    '@typescript-eslint',
    '@typescript-eslint/tslint',
    'react-hooks',
  ],
  rules: {
    ... coreESLintRules,
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array-simple',
      },
    ],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Object: {
            message: 'Avoid using the `Object` type. Did you mean `object`?',
          },
          Function: {
            message:
              'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.',
          },
          Boolean: {
            message: 'Avoid using the `Boolean` type. Did you mean `boolean`?',
          },
          Number: {
            message: 'Avoid using the `Number` type. Did you mean `number`?',
          },
          String: {
            message: 'Avoid using the `String` type. Did you mean `string`?',
          },
          Symbol: {
            message: 'Avoid using the `Symbol` type. Did you mean `symbol`?',
          },
        },
      },
    ],
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/consistent-type-definitions': 'error',
    '@typescript-eslint/dot-notation': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
      },
    ],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        // enforce no I-prefixed interfaces
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false,
        },
      },
    ],
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    '@typescript-eslint/quotes': 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/triple-slash-reference': [
      'error',
      {
        path: 'always',
        types: 'prefer-import',
        lib: 'always',
      },
    ],
    '@typescript-eslint/type-annotation-spacing': 'off',
    '@typescript-eslint/unified-signatures': 'error',
    'arrow-body-style': 'error',
    'arrow-parens': ['off', 'always'],
    'brace-style': ['off', 'off'],
    complexity: 'off',
    'constructor-super': 'error',
    curly: 'error',
    eqeqeq: ['error', 'smart'],
    'guard-for-in': 'error',
    'import/order': 'error',
    'jsdoc/check-alignment': 'error',
    'jsdoc/check-indentation': 'error',
    'jsdoc/newline-after-description': 'error',
    'max-classes-per-file': ['error', 1],
    'no-caller': 'error',
    'no-cond-assign': 'error',
    'no-console': 'off',
    'no-debugger': 'error',
    'no-empty': 'error',
    'no-eval': 'error',
    'no-extra-semi': 'off',
    'no-fallthrough': 'off',
    'no-invalid-this': 'off',
    'no-irregular-whitespace': 'off',
    'no-new-wrappers': 'error',
    'no-throw-literal': 'error',
    'no-unsafe-finally': 'error',
    'no-unused-labels': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'one-var': ['error', 'never'],
    'prefer-arrow/prefer-arrow-functions': 'error',
    'prefer-const': 'off',
    radix: 'error',
    'react/jsx-boolean-value': 'error',
    'react/jsx-curly-spacing': 'off',
    'react/jsx-equals-spacing': 'off',
    'react/jsx-key': 'error',
    // inline arrow functions are not very expensive, and React.useCallback can be
    // if it's overused https://kentcdodds.com/blog/usememo-and-usecallback
    'react/jsx-no-bind': 'off',
    'react/jsx-wrap-multilines': 'off',
    'use-isnan': 'error',
    'valid-typeof': 'off',
    '@typescript-eslint/tslint/config': [
      'error',
      {
        lintFile: './tslint.json',
        rules: {
          'jsx-no-string-ref': true,
          'jsx-self-close': true,
          'object-literal-sort-keys': true,
          'react-a11y-anchors': true,
          'react-a11y-aria-unsupported-elements': true,
          'react-a11y-event-has-role': true,
          'react-a11y-image-button-has-alt': true,
          'react-a11y-img-has-alt': true,
          'react-a11y-lang': true,
          'react-a11y-meta': true,
          'react-a11y-no-onchange': true,
          'react-a11y-props': true,
          'react-a11y-proptypes': true,
          'react-a11y-required': true,
          'react-a11y-role': true,
          'react-a11y-role-supports-aria-props': true,
          'react-a11y-tabindex-no-positive': true,
          'react-a11y-titles': true,
        },
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
