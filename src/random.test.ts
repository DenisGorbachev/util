import { expect } from './chai.js'
import { test } from '@jest/globals'
import { Random } from 'random'
import { getMean, getRandom, getStandardDeviation } from './random.js'
import { getLogNormalFromParameters } from './random/logNormal.js'

let random: Random
const minCount = 10000

beforeEach(function () {
  random = getRandom('static-seed')
})

test('logNormal', async function () {
  let sumValue = 0
  let sumVariance = 0
  const desiredMean = 10
  const desiredStandardDeviation = 2
  const $logNormal = getLogNormalFromParameters(desiredMean, desiredStandardDeviation, random)
  for (let i = 0; i < minCount; i++) {
    const value = $logNormal()
    sumValue += value
    sumVariance += (value - desiredMean) ** 2
  }
  const actualMean = sumValue / minCount
  const actualStandardDeviation = Math.sqrt(sumVariance / minCount)
  expect(actualMean).to.be.closeTo(desiredMean, 0.1)
  expect(actualStandardDeviation).to.be.closeTo(desiredStandardDeviation, 0.1)
})

// https://www.calculatorsoup.com/calculators/statistics/descriptivestatistics.php
test.each([
  [[1, 1, 1, 1, 2], 1.2, 0.447213595],
  [[3, 4, 5, 23, 23, 64, 433, 438, 4343], 592.888889, 1417.85626],
  [[-100, -23, 5, 23, 34], -12.2, 53.6069025],
])('sample stats %#', async function (sample: number[], expectedMean: number, expectedStandardDeviation: number) {
  const actualMean = getMean(sample)
  const actualStdDev = getStandardDeviation(sample, actualMean)
  expect(actualMean).to.be.closeTo(expectedMean, 0.01)
  expect(actualStdDev).to.be.closeTo(expectedStandardDeviation, 0.01)
})
