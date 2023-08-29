import { fileExists } from '../lib/file-exists'
import { join } from 'path'

const BABEL_CONFIG_FILES = [
  '.babelrc',
  '.babelrc.json',
  '.babelrc.js',
  '.babelrc.mjs',
  '.babelrc.cjs',
  'babel.config.js',
  'babel.config.json',
  'babel.config.mjs',
  'babel.config.cjs',
]

export async function getBabelConfigFile(
  dir: string
): Promise<string | undefined> {
  const babelConfigFile = await BABEL_CONFIG_FILES.reduce(
    async (memo: Promise<string | undefined>, filename) => {
      const configFilePath = join(dir, filename)
      return (
        (await memo) ||
        ((await fileExists(configFilePath)) ? configFilePath : undefined)
      )
    },
    Promise.resolve(undefined)
  )
  return babelConfigFile
}
