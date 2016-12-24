module.exports = function(app){
    
    app.get('/chat',function(req,res){
//        var connection = app.infra.connectionFactory();
//        var productDAO = new app.infra.ProductDAO(connection);

//        productDAO.list(function(err, results){
//            res.render('home/chat',{livros:results.rows});
//        });
        var allchat = req.body;
        res.render('home/chat');
        
    });
    
   app.post("/",function(req,res){
       var allchat = req.body;
       app.get('io').emit('newMsg',allchat);
       //res.redirect('/chat');
    });
    
}
