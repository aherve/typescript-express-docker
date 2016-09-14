/**
 * Main application routes
 */

import ping from './api/ping'
import * as express from 'express'

const routes = (app: express.Application): void => {
  // Insert routes below
  app.use('/api/ping', ping);

  // All other routes should 404
  app.route('/*')
  .get((req: express.Request, res: express.Response) => {
    res.sendStatus(404)
  });
};

export default routes
