import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: import('jest').Config = {
  clearMocks: true,
  collectCoverageFrom: ['./src/**'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/src/utils/fonts.ts',
    '<rootDir>/src/components/TeamMember/constants',
    '<rootDir>/src/constants/locales.ts',
    '<rootDir>/src/pages/_app.tsx',
    '<rootDir>/src/pages/_document.tsx',
  ],
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
};

export default createJestConfig(config);
