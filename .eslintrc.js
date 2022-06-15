/**
 * This file represents the best approximation of our development conventions in this project as of
 * the conversion from TSLint to ESLint in API-1323. The rules in this file should be considered
 * flexible and can be extended or relaxed as necessary. Feel free to add rules that would be helpful
 * and remove rules that are overly strict.
 *
 * Notes
 *  1. The Typescript ESLint plugin has several rules that extend rules in the core ESLint module. In
 *  general, we prefer to use the Typescript ESLint version. You can see a list of the extended rules
 *  here: https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#extension-rules
 *  2. Some rules can have a higher cost performance than others. To test performance of the rule set,
 *  run "TIMING=1 npm run lint". The TIMING flag causes ESLint to print out metrics on time to process
 *  each rule. https://eslint.org/docs/developer-guide/working-with-rules#per-rule-performance
 *
 * Presets included
 *  - Typescript ESLint: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/recommended.ts
 *    - ESLint via Typescript ESLint: https://github.com/eslint/eslint/blob/master/conf/eslint-recommended.js
 *  - Typescript ESLint with type checking: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.ts
 *  - React: https://github.com/yannickcr/eslint-plugin-react/blob/master/index.js
 *  - React rules of hooks: https://github.com/facebook/react/blob/master/packages/eslint-plugin-react-hooks/src/index.js
 *  - Accessibility: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/src/index.js
 */

// https://eslint.org/docs/rules/
const coreESLintRules = {
  'accessor-pairs': 'error',
  'array-bracket-spacing': 'error',
  'array-callback-return': 'error',
  'array-element-newline': ['error', 'consistent'],
  'arrow-body-style': 'error',
  'arrow-parens': ['error', 'as-needed'],
  'arrow-spacing': 'error',
  'block-scoped-var': 'error',
  'block-spacing': 'error',
  'class-methods-use-this': 'error',
  'comma-style': 'error',
  complexity: ['error', 12],
  'computed-property-spacing': 'error',
  'consistent-return': 'error',
  curly: 'error',
  'default-case': 'error',
  'default-case-last': 'error',
  'dot-location': ['error', 'property'],
  'eol-last': 'error',
  eqeqeq: ['error', 'always', { null: 'ignore' }],
  'grouped-accessor-pairs': 'error',
  'guard-for-in': 'error',
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
  'linebreak-style': 'error',
  'max-classes-per-file': ['error', 1],
  'max-depth': 'error',
  'max-lines': 'error', // default file length 300
  'max-nested-callbacks': ['error', 3], // default max is 10 callbacks
  'max-params': ['error', 4],
  'max-statements-per-line': 'error',
  'new-parens': 'error',
  'no-alert': 'error',
  'no-bitwise': 'error',
  'no-caller': 'error',
  'no-confusing-arrow': 'off',
  'no-console': 'error',
  'no-constructor-return': 'error',
  'no-div-regex': 'error',
  'no-eval': 'error',
  'no-extend-native': 'error',
  'no-extra-bind': 'error',
  'no-floating-decimal': 'error',
  'no-implicit-globals': 'error',
  'no-iterator': 'error',
  'no-label-var': 'error',
  'no-labels': 'error',
  'no-lone-blocks': 'error',
  'no-lonely-if': 'error',
  'no-mixed-operators': 'error',
  'no-multi-assign': 'error',
  'no-multiple-empty-lines': ['error', { max: 1 }],
  'no-negated-condition': 'error',
  'no-nested-ternary': 'error',
  'no-new': 'error',
  'no-new-func': 'error',
  'no-new-object': 'error',
  'no-new-wrappers': 'error',
  'no-octal-escape': 'error',
  'no-param-reassign': 'error',
  'no-plusplus': 'error',
  'no-promise-executor-return': 'error',
  'no-proto': 'error',
  'no-return-assign': 'error',
  'no-script-url': 'error',
  'no-self-compare': 'error',
  'no-sequences': 'error',
  'no-tabs': 'error',
  'no-trailing-spaces': 'error',
  'no-undef-init': 'error',
  'no-underscore-dangle': 'error',
  'no-unmodified-loop-condition': 'error',
  'no-unneeded-ternary': 'error',
  'no-useless-backreference': 'error',
  'no-useless-call': 'error',
  'no-useless-computed-key': 'error',
  'no-useless-concat': 'error',
  'no-useless-constructor': 'error',
  'no-useless-rename': 'error',
  'no-useless-return': 'error',
  'no-whitespace-before-property': 'error',
  'prefer-regex-literals': 'error',
  radix: 'error',
  'object-curly-spacing': ['error', 'always'],
  'object-shorthand': 'error',
  'padded-blocks': ['error', 'never'],
  'prefer-destructuring': ['error', { array: false, object: true }],
  'prefer-template': 'error',
  'rest-spread-spacing': 'error',
  'semi-spacing': 'error',
  'semi-style': 'error',
  'sort-keys': 'error',
  'space-before-blocks': 'error',
  'space-in-parens': 'error',
  'space-unary-ops': 'error',
  'spaced-comment': 'error',
  'switch-colon-spacing': 'error',
  'template-curly-spacing': 'error',
  'vars-on-top': 'error',
};

// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin
const typescriptESLintRules = {
  '@typescript-eslint/array-type': [
    'error',
    {
      default: 'array-simple',
    },
  ],
  // can be removed soon - leave for a bit after TSLint removal
  '@typescript-eslint/ban-tslint-comment': 'error',
  '@typescript-eslint/brace-style': 'error',
  '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
  '@typescript-eslint/comma-spacing': 'error',
  '@typescript-eslint/dot-notation': 'error',
  '@typescript-eslint/consistent-type-assertions': 'error',
  '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
  '@typescript-eslint/explicit-function-return-type': 'error',
  '@typescript-eslint/explicit-member-accessibility': 'error',
  '@typescript-eslint/func-call-spacing': 'error',
  /**
   * note that there are some issues with Typescript ESLint's indent rule:
   * https://github.com/typescript-eslint/typescript-eslint/issues/1824
   * ESLint's indent rule will not work for Typescript either, though. feel free to disable this
   * rule with a comment wherever you run into issues.
   */
  '@typescript-eslint/indent': ['off', 2],
  '@typescript-eslint/keyword-spacing': 'error',
  '@typescript-eslint/lines-between-class-members': 'error',
  '@typescript-eslint/member-delimiter-style': 'error',
  '@typescript-eslint/member-ordering': 'error',
  '@typescript-eslint/method-signature-style': 'error',
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
  '@typescript-eslint/no-base-to-string': 'error',
  '@typescript-eslint/no-confusing-non-null-assertion': 'error',
  '@typescript-eslint/no-dynamic-delete': 'error',
  '@typescript-eslint/no-dupe-class-members': 'error',
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-extraneous-class': 'error',
  '@typescript-eslint/no-implicit-any-catch': 'error',
  '@typescript-eslint/no-inferrable-types': 'off',
  '@typescript-eslint/no-invalid-this': 'error',
  '@typescript-eslint/no-invalid-void-type': 'error',
  '@typescript-eslint/no-loop-func': 'error',
  '@typescript-eslint/no-parameter-properties': 'error',
  '@typescript-eslint/no-redeclare': 'error',
  '@typescript-eslint/no-shadow': ['error', { hoist: 'all' }],
  '@typescript-eslint/no-throw-literal': 'error',
  '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
  '@typescript-eslint/no-unnecessary-condition': 'error',
  '@typescript-eslint/no-unnecessary-qualifier': 'error',
  '@typescript-eslint/no-unnecessary-type-arguments': 'error',
  '@typescript-eslint/no-unused-expressions': 'error',
  '@typescript-eslint/no-use-before-define': 'error',
  '@typescript-eslint/prefer-enum-initializers': 'error',
  '@typescript-eslint/prefer-for-of': 'error',
  '@typescript-eslint/prefer-function-type': 'error',
  '@typescript-eslint/prefer-includes': 'error',
  '@typescript-eslint/prefer-literal-enum-member': 'error',
  '@typescript-eslint/prefer-nullish-coalescing': 'error',
  '@typescript-eslint/prefer-optional-chain': 'error',
  '@typescript-eslint/prefer-readonly': 'error',
  '@typescript-eslint/prefer-reduce-type-parameter': 'error',
  '@typescript-eslint/prefer-string-starts-ends-with': 'error',
  '@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true }],
  '@typescript-eslint/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
  '@typescript-eslint/return-await': 'error',
  '@typescript-eslint/semi': ['error', 'always'],
  '@typescript-eslint/space-infix-ops': 'error',
  '@typescript-eslint/switch-exhaustiveness-check': 'error',
  '@typescript-eslint/type-annotation-spacing': 'error',
  '@typescript-eslint/unified-signatures': 'error',
};

/**
 * A lot of import rules are already covered by the Typescript compiler, so we don't use any
 * of the eslint-plugin-import presets. These rules are helpful additions.
 * https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules
 */
const importRules = {
  'import/first': 'error',
  'import/newline-after-import': 'error',
  'import/no-absolute-path': 'error',
  'import/no-amd': 'error',
  'import/no-anonymous-default-export': 'error',
  'import/no-commonjs': 'error',
  'import/no-cycle': 'error',
  // preferred over Typescript ESLint's and ESLint's no-duplicate-imports rules
  'import/no-duplicates': 'error',
  'import/no-dynamic-require': 'error',
  'import/no-extraneous-dependencies': 'error',
  'import/no-mutable-exports': 'error',
  'import/no-named-as-default': 'error',
  'import/no-named-default': 'error',
  'import/no-self-import': 'error',
  'import/no-unassigned-import': [
    'error',
    {
      allow: [
        '**/*.scss',
        '**/*.css',
        'jest', // can probably remove because an explicit import is not required in Jest context
        '@testing-library/jest-dom/extend-expect',
      ],
    },
  ],
  'import/no-useless-path-segments': 'error',
  'import/no-webpack-loader-syntax': 'error',
  'import/order': 'error', // preferred over ESLint's sorted-imports rule
};

// https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules
const reactRules = {
  'react/button-has-type': 'error',
  'react/default-props-match-prop-types': 'error',
  'react/function-component-definition': [
    'error',
    {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function',
    },
  ],
  'react/jsx-boolean-value': 'error',
  'react/jsx-closing-bracket-location': 'error',
  'react/jsx-closing-tag-location': 'error',
  'react/jsx-curly-brace-presence': [
    'error',
    {
      children: 'never',
      props: 'never',
    },
  ],
  'react/jsx-curly-newline': 'error',
  'react/jsx-curly-spacing': 'error',
  'react/jsx-equals-spacing': 'error',
  'react/jsx-first-prop-new-line': ['error', 'multiline'],
  'react/jsx-indent': ['error', 2],
  'react/jsx-indent-props': ['error', 2],
  'react/jsx-max-props-per-line': ['error', { when: 'multiline' }],
  // inline arrow functions are not very expensive, and React.useCallback can be
  // if it's overused https://kentcdodds.com/blog/usememo-and-usecallback
  'react/jsx-no-bind': 'off',
  // the following rule looks useful but isn't released yet?
  // 'react/jsx-no-constructed-context-values': 'error',
  'react/jsx-no-useless-fragment': 'error',
  'react/jsx-pascal-case': 'error',
  'react/jsx-props-no-multi-spaces': 'error',
  'react/jsx-tag-spacing': 'error',
  'react/no-adjacent-inline-elements': 'error',
  'react/no-array-index-key': 'error',
  'react/no-danger': 'error',
  'react/no-this-in-sfc': 'error',
  'react/no-unsafe': 'error',
  'react/no-unused-prop-types': 'error',
  'react/no-unused-state': 'error',
  'react/prefer-es6-class': 'error', // class extends React.Component vs createReactClass
  'react/prefer-stateless-function': 'error',
  'react/prop-types': 'off',
  'react/self-closing-comp': 'error',
  'react/sort-prop-types': 'error',
  'react/state-in-constructor': 'error',
  'react/static-property-placement': 'error',
  'react/style-prop-object': 'error',
  'react/void-dom-elements-no-children': 'error',
};

module.exports = {
  env: {
    browser: true,
    node: true,
  },
  ignorePatterns: ['*.spec.js'],
  root: true,
  // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'import',
    /**
     * NEVER disable JSX accessibility rules globally. If you need to disable them locally, either
     * because the code in question has been confirmed to be an exception to the rule or because the
     * work to fix the issue is pending, leave the inline disabling comment there so that other devs
     * are aware of the issue and issues elsewhere still get flagged. If you have confirmed an
     * exception to the linting rules, please document that in a comment, including links to external
     * long-form documentation as necessary.
     */
    'jsx-a11y',
    'prefer-arrow',
    'promise',
    'react',
    'react-hooks',
    'react-redux'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jsx-a11y/recommended',
    'plugin:promise/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-redux/recommended',
  ],
  rules: {
    ...coreESLintRules,
    ...typescriptESLintRules,
    ...importRules,
    ...reactRules,
    // https://github.com/TristonJ/eslint-plugin-prefer-arrow
    'prefer-arrow/prefer-arrow-functions': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['*.test.ts', '*.spec.ts', '*.test.tsx'],
      rules: {
        'max-nested-callbacks': 'off',
      },
    },
  ],
};
