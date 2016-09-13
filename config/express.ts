/**
 * Express configuration
 */

'use strict';

import * as express        from 'express'
import * as compression    from 'compression'
import * as bodyParser     from 'body-parser'
import * as methodOverride from 'method-override'

export default function(app) {  /* jshint maxstatements: false */
  var env = app.get('env');

  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());

};
