// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./chai-bignumber.d.ts" />
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import chaiThings from 'chai-things'
import chaiSubset from 'chai-subset'
import chaiBigNumber from 'chai-bignumber'
import { BigNumber } from 'bignumber.js'

chai.use(chaiAsPromised)
chai.use(chaiThings)
chai.use(chaiSubset)
chai.use(chaiBigNumber(BigNumber))

export const expect = chai.expect
