module.exports = function(app){
    
    app.get('/room', function(req,res,next){
        
        if (req.query.user == undefined){
            res.render('home/user',{errosValidacao:{},user:{}});
        }
        
        var connection = app.infra.connectionFactory();
        var roomDAO = new app.infra.RoomDAO(connection);

        roomDAO.list(function(err, results){
            
            if(err){            
                return next(err);
            }

            res.format({
                html: function(){
                   res.render('room/list',{rooms:results.rows,
                                           user:req.query.user}); 
                },
                json: function(){
                    res.json(results.rows);
                }
            });
            
        });
    });
    
    app.get('/room/form', function(req,res){
          res.render('room/form',{errosValidacao:{},
                                  room:{}
                                 }); 
        }
    );
    
   app.post("/room",function(req,res){
       
       var room = req.body;
            
       var validatorPassword = req.assert('password','Password is required').notEmpty();
       var validatorName = req.assert('name','Room is required').notEmpty();
        
       var erros = req.validationErrors();
       
       if(erros){
                
           res.format({
               html: function(){
                     res.status(400).render('room/form',{errosValidacao:erros, 
                                                         room:room
                                                        }); 
                   },
               json: function(){
                        res.status(400).json(erros);
                    }
                });                
                
                return;
            }

        var connection = app.infra.connectionFactory();
        var roomDAO = new app.infra.RoomDAO(connection);

        roomDAO.save(room,function(err, results){
            res.redirect('/room');
        });
       
    });
    
}
