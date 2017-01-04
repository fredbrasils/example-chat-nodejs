module.exports = function(app){
    
    var sockets_id = [];
    
    app.get('/chat',function(req,res){

        var allchat = req.body;
        res.render('chat/chat',{room:req.query.room,
                                user:req.query.user
                               });
        
    });
    
   app.post("/",function(req,res){
       var allchat = req.body;
//       console.log(allchat);
       var msg = ": " + allchat.msg;
       var user = allchat.user;
       
       app.get('io').emit(allchat.room,{user:user, msg:msg});
       res.redirect('/chat'); //doesn't work because I am using ajax
    });
    
    app.post("/welcome",function(req,res){
       var data = req.body;
       
       sockets_id.push({  id: data.id,
                        room: data.room,
                        user: data.user
                       });
        
       app.set('sockets_id',sockets_id);
//       console.log(app.get('sockets_id'));
       
       app.get('io').emit(data.room,{user:data.user, msg:" :: Acabou de entrar na conversa!"});
        
       res.redirect('/chat'); //doesn't work because I am using ajax
    });
    
}
