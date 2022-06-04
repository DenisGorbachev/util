import nock_original, { BackMode } from 'nock'
import { default as axios } from 'axios'
import httpAdapter from 'axios/lib/adapters/http'

nock_original.back.fixtures = __dirname + '/nock'
nock_original.back.setMode((process.env.NOCK_BACK_MODE || 'lockdown') as BackMode)
// Run `NOCK_BACK_MODE=record yarn test $FILENAME` to record new fixtures
// Run `NOCK_BACK_MODE=wild yarn test $FILENAME` to skip using fixtures, skip recording fixtures

axios.defaults.adapter = httpAdapter

export const nock = nock_original
