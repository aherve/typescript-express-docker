/**
 * Main application file
 */
import * as express from 'express'
import * as http from 'http'

import config from './config/environment'
import expressConfig from './config/express'
import routesConfig from './routes'

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Setup server
const app: express.Application = express();
const server = http.createServer(app)

expressConfig(app)
routesConfig(app)

// Start server
server.listen(config.port, config.ip, () => {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
})

// Expose app
export default app
