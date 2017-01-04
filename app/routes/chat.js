module.exports = function(app){
    
    app.get('/chat',function(req,res){
//        var connection = app.infra.connectionFactory();
//        var productDAO = new app.infra.ProductDAO(connection);

//        productDAO.list(function(err, results){
//            res.render('home/chat',{livros:results.rows});
//        });
        var allchat = req.body;
        res.render('chat/chat',{room:req.query.room,
                                user:req.query.user
                               });
        
    });
    
   app.post("/",function(req,res){
       var allchat = req.body;
       console.log(allchat);
       app.get('io').emit(allchat.room,allchat);
       //res.redirect('/chat');
    });
    
}
