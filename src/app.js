/* express module */
const express = require('express')

/* socket.io module */
const socket = require('socket.io')

/* node.js module http */
const http = require('http')

/* node.js module http */
const fs = require('fs')

/* express object */
const app = express()

/* create express server */
const server = http.createServer(app)

/* binding server to socket.io */
const io = socket(server)

app.use('/css', express.static('./src/static/css'))
app.use('/js', express.static('./src/static/js'))

app.get('/', function(req, res) {
    fs.readFile('./src/static/view/index.html', function(e, data) {
        if(e) {
            res.send('Error');
            console.error(e);
        } else {
            res.writeHead(200, {'Content-Type':'text/html'})
            res.write(data)
            res.end()
        }
    })

    // res.send('Hello World!!!');
})

io.sockets.on('connection', function(socket) {
    console.log('user in..')

    socket.on('send', function(data){
        console.log(data.msg);
    })

    socket.on('disconnect', function() {
        console.log('close..')
    })
})

app.listen(5050, function() {
    console.log('start! express server')
})