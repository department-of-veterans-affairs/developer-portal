/**
 * ESLint with our full config is not very fast because some rules are expensive. This 
 * performance cost isn't an issue in the lint checks in CI, but it does create problems in
 * the dev server and Jest Puppeteer tests that use the dev server. We use 
 * fork-ts-checker-webpack-plugin for Typescript type checking and ESLint checking in the dev
 * server Webpack config and the build process Webpack config. Slower linting means slower 
 * compilation, which causes (a) annoyance for developers running the server locally and (b)
 * timeouts in Jest Puppeteer tests, even with a high timeout like 60s.
 * 
 * Using the TIMING=1 flag for ESLint, we identified rules that were most costly and turned them
 * off. This alternate, slimmed-down config is used specifically in webpack.config.dev.js so
 * that the dev server can compile in a reasonable time while still performing lint checks. We
 * removed all rules that took over 1s at the time we tested (machine-dependent, obviously, but
 * it's a good threshold). There is sample output from that testing below. Many of these rules
 * are from eslint-plugin-react.
 * 
 * Rule                                    | Time (ms) | Relative
 * :---------------------------------------|----------:|--------:
 * @typescript-eslint/no-unsafe-assignment |  7244.564 |    16.9%
 * react/void-dom-elements-no-children     |  4355.130 |    10.1%
 * import/no-cycle                         |  2565.002 |     6.0%
 * react/prefer-stateless-function         |  1554.788 |     3.6%
 * react/static-property-placement         |  1454.459 |     3.4%
 * react/no-direct-mutation-state          |  1434.071 |     3.3%
 * react/default-props-match-prop-types    |  1428.938 |     3.3%
 * react/no-deprecated                     |  1370.947 |     3.2%
 * react/no-string-refs                    |  1357.215 |     3.2%
 * react/prop-types                        |  1354.970 |     3.2%
 * 
 * # ... next run, TIMING=1 prints out 10 worst rules
 * react/function-component-definition |  1410.822 |     7.0%
 * react/display-name                  |  1336.392 |     6.6%
 * react/no-unsafe                     |  1322.879 |     6.6%
 * react/no-unused-prop-types          |  1321.241 |     6.6%
 * react/no-unused-state               |  1320.183 |     6.6%
 * react/require-render-return         |  1314.952 |     6.5%
 * react/prefer-es6-class              |  1314.001 |     6.5%
 * react/no-this-in-sfc                |  1303.624 |     6.5%
 * react/state-in-constructor          |  1298.542 |     6.4%
 * 
 * Resources:
 * - ESLint performance: https://eslint.org/docs/developer-guide/working-with-rules#per-rule-performance
 * - fork-ts-webpack-checker-plugin: https://github.com/TypeStrong/fork-ts-checker-webpack-plugin
 */

module.exports = {
  extends: ['./.eslintrc.js'],
  rules: {
    '@typescript-eslint/no-unsafe-assignment': 'off',
    'import/no-cycle': 'off',
    'react/default-props-match-prop-types': 'off',
    'react/display-name': 'off',
    'react/function-component-definition': 'off',
    'react/no-deprecated': 'off',
    'react/no-direct-mutation-state': 'off',
    'react/no-string-refs': 'off',
    'react/no-this-in-sfc': 'off',
    'react/no-unsafe': 'off',
    'react/no-unused-prop-types': 'off',
    'react/no-unused-state': 'off',
    'react/prefer-es6-class': 'off',
    'react/prefer-stateless-function': 'off',
    'react/prop-types': 'off',
    'react/require-render-return': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'react/void-dom-elements-no-children': 'off',
  },
};
