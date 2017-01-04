var app = require('./config/express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('io',io);

var porta = process.env.PORT || 3000;
http.listen(porta,function(){
    console.log("starting server");
});

io.on('connection', function(socket){
    console.log('a user connected');
  
    // Use socket to communicate with this particular client only, sending it it's own id
    socket.emit('welcome', {id: socket.id });
      
    socket.on('disconnect', function(){
        console.log('user disconnected:' + socket.id);
        
        var data = [];
        var sockets = app.get('sockets_id');
        
        for(index=0; index < sockets.length; index++){
           if(sockets[index].id === socket.id){
               data = sockets[index];
               sockets.splice(index, 1);
           }
       }    
        
        app.get('io').emit(data.room,{user:data.user, msg:" :: saiu da conversa!"});
    });
});
