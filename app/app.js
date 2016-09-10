var express = require('express');
var reload = require('reload');
var app = express();
var io = require('socket.io')();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', 'app/views');	//dir of view file

app.use(express.static('app/public')); 	//node app/app.js
// app.use(require('./routes/index.js'));
// app.use(require('./routes/anime.js'));
app.use(require('./routes/chat.js'));

var server = app.listen(app.get('port'), function(){
	console.log('Go to: localhost:'+app.get('port'));
});

io.attach(server);

io.on('connection', function(socket) {
	socket.on('postMessage', function(data) {
    	io.emit('updateMessages', data);
  	});
});

reload(server, app);