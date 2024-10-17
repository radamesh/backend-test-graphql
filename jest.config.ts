/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  verbose: true,
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: [
    "reflect-metadata",
    "./jest.setup.ts"
  ],
  setupFiles: [
    '<rootDir>/__tests__/mocks/axios.ts',
    '<rootDir>/__tests__/mocks/AxiosMockHelper.ts',
    '<rootDir>/.jest/setEnvVars.ts',
    'dotenv/config'
  ],
  testMatch: [
    '<rootDir>/__tests__/**/*.spec.ts',
    '<rootDir>/__tests__/**/*.test.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,

    },
  },
};
