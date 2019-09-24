var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8000;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('a user connected ' + socket.client);

});


io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });
});

io.on('connection', function (socket) {
  socket.on('login', function (username) {
    io.emit('login', username)
  });

  io.on('connection', function (socket) {
    socket.on('typing', function (username) {
      io.sockets.emit('typing', username)
    })
  })
});



http.listen(port, function () {
  console.log('listening on *:' + port);
});
