/*
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('views/pages/index.html');
});

app.get('/PhilGeurinHeadshot3RotatedResized2.jpg', function(req, res){
  res.sendfile('views/pages/PhilGeurinHeadshot3RotatedResized2.jpg');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

//http.listen(80, function(){
//  console.log('listening on *:80');
//});
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
*/

//Used parts of https://github.com/heroku-examples/node-socket.io/blob/master/server.j-s
'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'views/pages/index.html');
//const PHOTO = path.join(__dirname, 'views/pages/PhilGeurinHeadshot3RotatedResized2.jpg');


const server = express()
  //.get('/PhilGeurinHeadshot3RotatedResized2.jpg', function(req, res){res.sendfile('views/pages/PhilGeurinHeadshot3RotatedResized2.jpg');})
  .use((req, res) => res.sendFile(INDEX) )
  //.use((req, res) => res.sendFile(PHOTO) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
