export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/jest.mock.js',
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['babel-jest', { presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'] }],
  },
  testMatch: ['**/__tests__/**/*.(test|spec).(ts|tsx)'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/main.tsx',
    '!src/**/*.d.ts',
  ],
}