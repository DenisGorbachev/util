const { getConfig } = require('./src/dotenv.js')

module.exports = async () => {
  const config = getConfig()
  Object.assign(process.env, config)
}
