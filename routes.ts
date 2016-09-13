/**
 * Main application routes
 */

import ping from './api/ping'

export default function (app) {
  // Insert routes below
  app.use('/api/ping', ping);

  // All other routes should 404
  app.route('/*')
  .get(function(req, res) {
    res.sendStatus(404)
  });
};
