module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/.next/**',
    '!*.config.*',
  ],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  setupFiles: ['<rootDir>/tests/setup.js'],
  setupFilesAfterEnv: ['<rootDir>/tests/setupAfterEnv.js'],
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
  testPathIgnorePatterns: ['/.next/', '/node_modules/', '/tests/', '/coverage/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx|css)$': 'babel-jest',
  },
}
