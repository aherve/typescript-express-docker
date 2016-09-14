import * as express from 'express'
/**
 * Express configuration
 */

import * as bodyParser from 'body-parser'
import * as compression from 'compression'
import * as methodOverride from 'method-override'

export default (app: express.Application): void => {

  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());

};
