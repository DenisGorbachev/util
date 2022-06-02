const fs = require('fs')
const dotenv = require('dotenv')

function readFileSyncIfExists(path, defaults = '') {
  if (fs.existsSync(path)) {
    return fs.readFileSync(path)
  } else {
    return defaults
  }
}

function getConfig() {
  const global = dotenv.parse(readFileSyncIfExists(`${__dirname}/../.env`))
  const dev = dotenv.parse(readFileSyncIfExists(`${__dirname}/../.env.development`))
  const local = dotenv.parse(readFileSyncIfExists(`${__dirname}/../.env.local`))
  return Object.assign({}, global, dev, local)
}

module.exports = {
  readFileSyncIfExists,
  getConfig,
}
