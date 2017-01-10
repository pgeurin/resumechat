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