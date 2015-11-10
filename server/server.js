var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var uuid = require('node-uuid');
var express = require('express');

var app = express();

app.use(express.static('.'));

var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

var wss = new WebSocketServer({ port: 8181 });

var connections = {};

wss.on('connection', function connection(ws) {
  var id = uuid.v4();
  ws.uuid = id;
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send('hey, I got your message');
  });

  ws.send('something');
});
