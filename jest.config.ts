import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: 'ts-jest', // Ensures TypeScript is handled
  testEnvironment: 'node', // Simulates a Node.js environment for tests
  roots: ['<rootDir>/tests'], // Test files are inside the `tests` directory
  moduleFileExtensions: ['ts', 'js'], // Recognize TypeScript and JavaScript files
};

export default config;
