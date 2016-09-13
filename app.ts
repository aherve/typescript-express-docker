/**
 * Main application file
 */
import * as http from "http";
import * as express from "express"
import expressConfig from './config/express'
import routesConfig from './routes'

// Setup server
const app = express();
const server = http.createServer(app)

expressConfig(app)
routesConfig(app)

// Start server
server.listen(9000, undefined, function () {
  console.log('Express server listening on %d, in %s mode', 9000, app.get('env'));
})

// Expose app
export default app
