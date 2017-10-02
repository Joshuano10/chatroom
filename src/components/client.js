import io from 'socket.io-client';

var socket = io.connect('http://localhost:8080');

var chat = {
    socket: socket,
    onlineCount: 0,
    message: '',
    username: '',
    init: function(name) {
        this.socket.emit('enter',name);
    },
    anotherEnter: function(fn) {
        fn();
		this.socket.on('anotherenter', (msg) => {
            console.log(msg.username + '加入聊天室');
            this.onlineCount = msg.onlineCount;
            this.message = msg.username + '加入聊天室';
            this.username = '';
            fn();
        });
	},
    anotherLeave: function(fn) {
        this.socket.on('anotherleave', (msg) => {
            console.log(msg.username + '离开聊天室');
            this.onlineCount = msg.onlineCount;
            this.message = msg.username + '离开聊天室';
            this.username = '';
            fn();
        });
    },
    mysend: function(msg,username) {
        this.socket.emit('mysend', msg, username);
    },
    anothersend: function(fn) {
        this.socket.on('anothersend', (msg) => {
            console.log(msg.username + ':' + msg.content);
            this.username = msg.username;
            this.message = msg.content;
            fn();
        })
    }

}

export default chat;
