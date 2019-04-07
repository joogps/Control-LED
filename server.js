var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
  fs.readFile('public/index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}).listen(8080);

var io = require('socket.io')(server);
var gpio = require('rpi-gpio');

gpio.setMode(gpio.MODE_BCM);
gpio.setup(4, gpio.DIR_OUT);

io.sockets.on('connection', function(socket) {
	console.log('Connected');

	socket.on('on', function() {
		gpio.write(4, true);
	});

	socket.on('off', function() {
		gpio.write(4, false);
	});
});
