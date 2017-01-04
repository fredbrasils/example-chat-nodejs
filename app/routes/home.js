module.exports = function(app){
    app.get('/',function(req,res){
        res.render('home/user',{errosValidacao:{},user:""});
    });

    app.post("/user",function(req,res){
       
           var user = req.body;

           if (user.name == ''){
               user = ""
           }
                
           var validatorName = req.assert('name','Name is required').notEmpty();

           var erros = req.validationErrors();

           if(erros){

               res.format({
                   html: function(){
                         res.status(400).render('home/user',{errosValidacao:erros, 
                                                             user:user
                                                            }); 
                       },
                   json: function(){
                            res.status(400).json(erros);
                       }
                });                

                return;
            }
            
        var userName = encodeURIComponent(user.name);
        res.redirect('/room?user='+userName);

    });
}

