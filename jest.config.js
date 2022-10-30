import { defaults } from 'jest-config'
import { merge } from 'lodash-es'

const config = merge({}, defaults, {
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  testPathIgnorePatterns: [
    '<rootDir>/dist',
  ],
  extensionsToTreatAsEsm: ['.jsx', '.ts', '.tsx'],
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

export default config
