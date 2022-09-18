// NOTE: use "chai-bn", not "chai-bignumber" (idk why, maybe conflicts with an existing module name)
import './chai-bn.d.ts'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import chaiThings from 'chai-things'
import chaiSubset from 'chai-subset'
import chaiBigNumber from 'chai-bignumber'
import BigNumber from 'bignumber.js'

chai.use(chaiAsPromised)
chai.use(chaiThings)
chai.use(chaiSubset)
chai.use(chaiBigNumber(BigNumber))

export const expect = chai.expect
