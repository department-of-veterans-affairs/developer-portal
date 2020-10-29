module.exports = {
  extends: ['./.eslintrc.js'],
  rules: {
    'no-console': 'error',
    // set to warning in @typescript-eslint/recommended
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    // set to warning in @typescript-eslint/recommended
    '@typescript-eslint/no-unused-vars': 'error',
  },
};
