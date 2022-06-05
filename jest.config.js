import { merge } from 'lodash-es'
import { defaults } from 'jest-config'
import { createJestPreset, TS_EXT_TO_TREAT_AS_ESM } from 'ts-jest'

const preset = createJestPreset(false, { extensionsToTreatAsEsm: TS_EXT_TO_TREAT_AS_ESM })

const config = merge({}, defaults, preset, {
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

export default config
