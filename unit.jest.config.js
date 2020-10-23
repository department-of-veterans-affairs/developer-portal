module.exports = {
  name: 'unit',
  automock: false,
  displayName: 'Unit Tests',
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  setupFiles: [
    '<rootDir>/config/polyfills.js',
    '<rootDir>/setupJest.ts',
    '<rootDir>/config/jest/testEnv.js', // only necessary when running Jest directly
  ],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(j|t)s?(x)',
    '<rootDir>/src/**/?(*.)(spec|test).(j|t)s?(x)',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/src/containers/documentation/swaggerPlugins/CurlForm.test.tsx',
  ],
  testEnvironment: 'jsdom',
  testURL: process.env.TEST_HOST || 'http://localhost:4444',
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^.+\\.ya?ml$': '<rootDir>/config/jest/yamlTransform.js',
    '^(?!.*\\.(js|jsx|mjs|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$'],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    'content/news.yml': '<rootDir>/src/__mocks__/news.test.yml',
    '\\.(svg|png)': '<rootDir>/src/__mocks__/fakeImage.ts',
  },
  moduleFileExtensions: [
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'web.js',
    'js',
    'yml',
    'yaml',
    'web.jsx',
    'jsx',
    'json',
    'node',
    'mjs',
  ],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
    },
  },
};
