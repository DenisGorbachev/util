import { Random } from 'random'
import { getMean, getStandardDeviation, RandomNumberGenerator } from '../random.js'
import { BigNumber } from 'bignumber.js'
import { todo } from '../todo.js'

export function getLogNormal(sample: number[], random: Random): RandomNumberGenerator {
  const mean = getMean(sample)
  const stddev = getStandardDeviation(sample, mean)
  return getLogNormalFromParameters(mean, stddev, random)
}

export function getLogNormalFromParameters(desiredMean: number, desiredStandardDeviation: number, random: Random) {
  // Formulas from https://en.wikipedia.org/wiki/Log-normal_distribution#Generation_and_parameters
  const mean = getLogNormalMean(desiredMean, desiredStandardDeviation)
  const standardDeviation = getLogNormalStandardDeviation(desiredMean, desiredStandardDeviation)
  return random.logNormal(mean, standardDeviation)
}

export function getLogNormalMean(desiredMean: number, desiredStandardDeviation: number) {
  const desiredMeanSquared = desiredMean * desiredMean
  const desiredStandardDeviationSquared = desiredStandardDeviation * desiredStandardDeviation
  return Math.log(desiredMeanSquared / Math.sqrt(desiredMeanSquared + desiredStandardDeviationSquared))
}

export function getLogNormalStandardDeviation(desiredMean: number, desiredStandardDeviation: number) {
  const desiredMeanSquared = desiredMean * desiredMean
  const desiredStandardDeviationSquared = desiredStandardDeviation * desiredStandardDeviation
  return Math.sqrt(Math.log(1 + desiredStandardDeviationSquared / desiredMeanSquared))
}

export function withinLogNormalStdDevBigNumber(amounts: BigNumber[], amount: BigNumber, deviation: number) {
  return todo(false)
}
