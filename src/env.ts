import { readFile } from 'fs/promises'
import { parse } from 'dotenv'
import { PathLike } from 'fs'
import { merge } from 'lodash-es'
import ProcessEnv = NodeJS.ProcessEnv

export type Env = Record<string, string>

/**
 * NOTE: This function updates process.env
 */
export async function loadEnv() {
  const cwd = process.cwd()
  const configs = await Promise.all([
    getEnvFromFileMaybe(`${cwd}/.env`),
    getEnvFromFileMaybe(`${cwd}/.env.development`),
    getEnvFromFileMaybe(`${cwd}/.env.local`),
  ])
  return configs.reduce<ProcessEnv>(function (fullConfig, partialConfig) {
    return merge(fullConfig, partialConfig)
  }, process.env)
}

export async function getEnvFromFileMaybe(filename: PathLike) {
  return readFile(filename).then(parse).catch((e) => {
    if (e.code === 'ENOENT') {
      return {}
    } else {
      throw e
    }
  })
}
