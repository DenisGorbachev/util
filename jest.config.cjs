const { merge } = require('lodash')
const { defaults } = require('jest-config')
const tsJestPresets = require('ts-jest/presets')

const config = merge({}, defaults, tsJestPresets.defaultsESM, {
  globals: {
    'ts-jest': {
      useESM: true,
      isolatedModules: true,
      // tsconfig: {
      //     jsx: 'react',
      //     sourceMap: true,
      //   },
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  globalSetup: './jest.setup.cjs',
  setupFilesAfterEnv: ['./jest.setupAfterEnv.cjs'],
  // maxWorkers: 1, // Speedup tests: <https://github.com/kulshekhar/ts-jest/issues/259#issuecomment-504088010>
  modulePaths: ['<rootDir>'],
  transformIgnorePatterns: [
    ...defaults.transformIgnorePatterns,
    'node_modules/(?!(@dengorbachev/coda-js-client)/)',
    'node_modules/(?!(stack-trace)/)',
  ],
})

module.exports = config
