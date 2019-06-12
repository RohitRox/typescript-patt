module.exports = {
  verbose: true,
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: 'app',
  testRegex: '.spec.(j|t)s$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testEnvironment: 'node',
  preset: 'ts-jest',
  setupFiles: ["<rootDir>/spec_helpers/setup.ts"]
};
