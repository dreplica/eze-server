#!/usr/bin/env node
require("regenerator-runtime/runtime");
require('dotenv').config();
/**
 * Module dependencies.
 */

var app = require('../app').default;
var debug = require('debug')('eze-test:server');
var http = require('http');
const mongoose = require('mongoose')

/**
 * Get port from environment and store in Express.
 */

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true
})

const mongo_connect = () => console.log("definitely connected now to mongoose");
const mongo_disconnect = () => console.log("disconnected from mongoose");
const mongo_error = () => console.log("mongoose error occured");

async function mongo_events() {
  try {
    await mongoose.connection.on("connected", mongo_connect);
    await mongoose.connection.on("disconnected", mongo_disconnect);
    await mongoose.connection.on("error", mongo_error);
  } catch (error) {
    console.log(error);
    process.exit()
  }
}

mongo_events()

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  console.log("runiing on port",port)
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
