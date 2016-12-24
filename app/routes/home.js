module.exports = function(app){
    app.get('/',function(req,res){
        
        var connection = app.infra.connectionFactory();
        var roomDAO = new app.infra.RoomDAO(connection);

        roomDAO.list(function(err, results){
            
            if(err){            
                return next(err);
            }

            res.format({
                html: function(){
                   res.render('room/list',{rooms:results.rows}); 
                },
                json: function(){
                    res.json(results.rows);
                }
            });
            
        });
        
    });
}