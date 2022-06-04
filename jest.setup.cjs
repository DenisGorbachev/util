const { getConfig } = require('./src/dotenv.cjs')

module.exports = async () => {
  const config = getConfig()
  Object.assign(process.env, config)
}
