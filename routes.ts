/**
 * Main application routes
 */

import ping from './api/ping'

export default (app) => {
  // Insert routes below
  app.use('/api/ping', ping);

  // All other routes should 404
  app.route('/*')
  .get((req, res) => {
    res.sendStatus(404)
  });
};
