var path = require('path');
var express = require('express');
var proxyMiddleware = require('http-proxy-middleware')

require('./API/config.js')
var app = express()
app.use(express.static(path.join(__dirname, '/dist/')))
var proxyTable = {
}

Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = {
            target: options
        }
    }
    app.use(proxyMiddleware(context, options))
})
app.listen(5000, function (err) {
    if (err) {
        console.log(err);
        return
    }
    console.log('server start 5000')
})
