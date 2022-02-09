module.exports = {
  name: 'unit',
  automock: false,
  displayName: 'Unit Tests',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.{d,e2e,test}.{ts,tsx}',
    '!src/base.accessibility.ts',
    '!src/testHelpers.ts',
    '!src/index.tsx',
    '!src/registerServiceWorker.ts',
    '!src/visualRegressionTest.ts',
    '!src/containers/consumerOnboarding/validationSchema.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 65,
      functions: 74,
      lines: 85,
      statements: 85
    }
  },
  setupFiles: [
    '<rootDir>/config/polyfills.js',
    '<rootDir>/config/jest/testEnv.js', // only necessary when running Jest directly
  ],
  setupFilesAfterEnv: ['<rootDir>/config/jest/setupJestPostEnv.js'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(j|t)s?(x)',
    '<rootDir>/src/**/?(*.)(spec|test).(j|t)s?(x)',
  ],
  testPathIgnorePatterns: [],
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
      tsconfig: 'tsconfig.test.json',
    },
  },
};
