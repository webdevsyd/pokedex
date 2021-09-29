const path = require('path');

module.exports = {
  watchPathIgnorePatterns: ['node_modules'],
  testPathIgnorePatterns: ['/node_modules/'],
  testEnvironment: 'jsdom',
  collectCoverage: false,
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/file-mock.js',
    '\\?(raw|raw-module)$': '<rootDir>/file-mock.js',
    '\\.(css|less)$': '<rootDir>/identity-obj-proxy.js',
  },
  setupFiles: [path.resolve(__dirname, './test-setup.js')],
};
