const { merge } = require('lodash')
const { defaults } = require('jest-config')
const tsJestPresets = require('ts-jest/presets')

const config = merge({}, defaults, tsJestPresets.defaults, {
  globals: {
    'ts-jest': {
      isolatedModules: true,
      // tsconfig: {
      //     jsx: 'react',
      //     sourceMap: true,
      //   },
    },
  },
  globalSetup: './jest.setup.js',
  setupFilesAfterEnv: ['./jest.setupAfterEnv.js'],
  // maxWorkers: 1, // Speedup tests: <https://github.com/kulshekhar/ts-jest/issues/259#issuecomment-504088010>
  modulePaths: ['<rootDir>'],
  transformIgnorePatterns: [
    ...defaults.transformIgnorePatterns,
    'node_modules/(?!(@dengorbachev/coda-js-client)/)',
    'node_modules/(?!(stack-trace)/)',
  ],
})

module.exports = config
