import developmentConfig from './development'
import productionConfig from './production'
import testConfig from './test'

export interface IConfig {
  allowedOrigins?: string[],
  appName?: string
  env?: string
  ip?: string
  port?: number
  secrets?: {
    session?: string
  }
}

// All configurations will extend these options
// ============================================
const commonConfig = {
  appName: process.env.APP_NAME || `hunteed-${process.env.NODE_ENV}`,
  env: process.env.NODE_ENV,

  // Server port
  port: process.env.PORT || 9000,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: process.env.SECRET_SESSION || 'superSecr3t'
  },

}

// Export the config object based on the NODE_ENV
// ==============================================
let config: IConfig

if (commonConfig.env === 'development') {
  config = Object.assign({}, commonConfig, developmentConfig )
} else if (commonConfig.env === 'test') {
  config = Object.assign({}, commonConfig, testConfig )
} else if (commonConfig.env === 'production') {
  config = Object.assign({}, commonConfig, productionConfig )
} else {
  throw new Error('Please set an environment')
}

export default config
