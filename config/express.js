
var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function(){
    console.log("Express loading..");
    
    var app = express();
    
    app.use(express.static('./app/public'));
    
    app.set('view engine','ejs');
    app.set('views','./app/views');
    
    //middleware
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(expressValidator());
    
    load('routes',{cwd: 'app'})
        .then('infra')
        .into(app);

    
//    app.use(function(req,res,next){
//        res.status(404).render('erros/404');
//        next();
//    });
//    
//    app.use(function(error,req,res,next){
//        res.status(500).render('erros/500');
//        next();
//    });
    
    
    return app;
}