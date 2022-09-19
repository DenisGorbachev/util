import nock_original, { BackMode } from 'nock'
import { default as axios } from 'axios'
// eslint-disable-next-line import/extensions
import httpAdapter from 'axios/lib/adapters/http'
import { get__dirname } from './node'

nock_original.back.fixtures = get__dirname(import.meta.url) + '/nock'
nock_original.back.setMode((process.env.NOCK_BACK_MODE || 'lockdown') as BackMode)
// Run `NOCK_BACK_MODE=record yarn test $FILENAME` to record new fixtures
// Run `NOCK_BACK_MODE=wild yarn test $FILENAME` to skip using fixtures, skip recording fixtures

axios.defaults.adapter = httpAdapter

export const nock = nock_original
