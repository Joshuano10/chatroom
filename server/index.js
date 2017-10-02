var express = require('express');
var app = express();
var server = app.listen(8080);
var io = require('socket.io').listen(server);

//在线用户
var onlineUsers = {};
//当前在线人数
var onlineCount = 0;
var userId = 0;

io.on('connection', function(socket) {
	console.log('a user connected');
    socket.on('enter', function(name) {
        socket.name = userId;
        onlineUsers[userId] = {
            username: name,
            userId: userId
        };
        userId++;
        onlineCount++
        io.emit('anotherenter', {onlineCount: onlineCount, username: name});
        console.log(name +'加入了聊天室',onlineCount);
    });

    socket.on('disconnect', function() {
        if (onlineUsers[socket.name]) {
            onlineCount--;
            io.emit('anotherleave', {onlineCount: onlineCount, username: onlineUsers[socket.name].username});
            console.log(onlineUsers[socket.name].username +'离开了聊天室',onlineCount);
            delete onlineUsers[socket.name];
        }
    });

    socket.on('mysend', function(msg, username) {
        console.log(username + ':' + msg);
        socket.broadcast.emit('anothersend',{content: msg, username: username});
    })
});


http.listen(8080, function(){
	console.log('listening on *:8080');
});
