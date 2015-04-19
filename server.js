#!/bin/env node
 //  OpenShift sample Node application

var fs = require('fs');
var app = require('./app');
var http = require('http');


/**
 *  Define the sample application.
 */
app.serve = {};

/*  ================================================================  */
/*  Helper functions.                                                 */
/*  ================================================================  */

/**
 *  Set up server IP address and port # using env variables/defaults.
 */
app.serve.setupVariables = function () {
  //  Set the environment variables we need.
  app.serve.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
  app.serve.port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

  if (typeof app.serve.ipaddress === "undefined") {
    //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
    //  allows us to run/test the app locally.
    console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
    app.serve.ipaddress = "127.0.0.1";
  };
};


/**
 *  Populate the cache.
 */
app.serve.populateCache = function () {
  if (typeof app.serve.zcache === "undefined") {
    app.serve.zcache = {
      'index.html': ''
    };
  }

  //  Local cache for static content.
  app.serve.zcache['index.html'] = fs.readFileSync('./index.html');
};


/**
 *  Retrieve entry (content) from cache.
 *  @param {string} key  Key identifying content to retrieve from cache.
 */
app.serve.cache_get = function (key) {
  return app.serve.zcache[key];
};


/**
 *  terminator === the termination handler
 *  Terminate server on receipt of the specified signal.
 *  @param {string} sig  Signal to terminate on.
 */
app.serve.terminator = function (sig) {
  if (typeof sig === "string") {
    console.log('%s: Received %s - terminating sample app ...',
      Date(Date.now()), sig);
    process.exit(1);
  }
  console.log('%s: Node server stopped.', Date(Date.now()));
};


/**
 *  Setup termination handlers (for exit and a list of signals).
 */
app.serve.setupTerminationHandlers = function () {
  //  Process on exit and signals.
  process.on('exit', function () {
    app.serve.terminator();
  });

  // Removed 'SIGPIPE' from the list - bugz 852598.
  ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
    'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
  ].forEach(function (element, index, array) {
    process.on(element, function () {
      app.serve.terminator(element);
    });
  });
};


/*  ================================================================  */
/*  App server functions (main app logic here).                       */
/*  ================================================================  */

/**
 *  Create the routing table entries + handlers for the application.
 */
app.serve.createRoutes = function () {
  app.serve.routes = {};

  app.serve.routes['/asciimo'] = function (req, res) {
    var link = "http://i.imgur.com/kmbjB.png";
    res.send("<html><body><img src='" + link + "'></body></html>");
  };

  app.serve.routes['/'] = function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.send(app.serve.cache_get('index.html'));
  };
};


/**
 *  Initialize the server (express) and create the routes and register
 *  the handlers.
 */
app.serve.initializeServer = function () {
  app.serve.createRoutes();
  app.serve.server = http.createServer(app);

  /*
  //  Add handlers for the app (from the routes).
  for (var r in app.routes) {
    app.serve.get(r, app.serve.routes[r]);
  }
  */
};


/**
 *  Initializes the sample application.
 */
app.serve.initialize = function () {
  app.serve.setupVariables();
  app.serve.populateCache();
  app.serve.setupTerminationHandlers();

  // Create the express server and routes.
  app.serve.initializeServer();
};


/**
 *  Start the server (starts up the sample application).
 */
app.serve.start = function () {
  //  Start the app on the specific interface (and port).
  app.serve.server.listen(app.serve.port, app.serve.ipaddress, function () {
    console.log('%s: Node server started on %s:%d ...',
      Date(Date.now()), app.serve.ipaddress, app.serve.port);
  });
};

/**
 *  main():  Main code.
 */

app.serve.initialize();
app.serve.start();