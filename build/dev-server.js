require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// require('../server/index.js');

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

/*socket.io*/

var io = require('socket.io').listen(server)

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


/*end*/

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
