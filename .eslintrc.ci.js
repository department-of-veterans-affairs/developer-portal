/**
 * This file extends the main .eslintrc.js file and overrides any of its rules that are set
 * to warn to be at the error level in CI. The purpose of this is to allow the dev server to 
 * compile with certain temporary issues, such as console logging statements, that may be 
 * necessary during the development process.
 */

module.exports = {
  extends: ['./.eslintrc.js'],
  rules: {
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/explicit-function-return-type': 'error',
    // set to warning in @typescript-eslint/recommended
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    // set to warning in @typescript-eslint/recommended
    '@typescript-eslint/no-unused-vars': 'error',
    'multiline-comment-style': 'error',
    'no-console': 'error',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-trailing-spaces': 'error',
  },
};
