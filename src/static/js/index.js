var socket = io();

socket.on('connect', function() {
    var input = document.getElementById('test')
    input.value = '접속 됨'
})

var send = function() {
    
    var message = document.getElementById('test').value

    document.getElementById('test').value = ''

    socket.emit('send', {msg:message})
}