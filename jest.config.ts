import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: import('jest').Config = {
  clearMocks: true,
  collectCoverageFrom: ['./src/**'],
  coverageDirectory: 'coverage',
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  collectCoverage: true,
};

export default createJestConfig(config);
