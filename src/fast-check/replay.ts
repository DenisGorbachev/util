import { existsSync } from 'fs'
import { Parameters } from 'fast-check'
import { CommandsContraints } from 'fast-check/lib/types/check/model/commands/CommandsContraints'
import { requireUncached } from '../require'

export const REPLAY_PARAMETERS_PATH = `${process.cwd()}/replay.cjs`

export type AssertReplayParameters = Pick<Parameters, 'seed' | 'path' | 'endOnFailure'>

export type CommandsReplayParameters = Pick<CommandsContraints, 'replayPath'>

export type ReplayParameters = {
  assertParameters: AssertReplayParameters
  commandsParameters: CommandsReplayParameters
}

export function getAssertReplayParameters(): AssertReplayParameters {
  return getReplayParameters().assertParameters
}

export function getCommandsReplayParameters(): CommandsReplayParameters {
  return getReplayParameters().commandsParameters
}

export function getReplayParameters(): ReplayParameters {
  return process.env.CI ? {} : (existsSync(REPLAY_PARAMETERS_PATH) ? requireUncached(REPLAY_PARAMETERS_PATH) : {})
}
