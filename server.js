const express = require('express');
const ejs = require('ejs');
const http = require('http');
const container = require('./container');
const { userInfo } = require('os');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport')
const expressValidator = require('express-validator');



container.resolve(function(users, _, admin, home){
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/londonmet', 
    { useNewUrlParser: true ,
    useUnifiedTopology: true})

    const app = SetupExpress();

    function SetupExpress(){
        const app = express();
        const server = http.createServer(app);
        server.listen(3000, function(){
            console.log('listening on port 3000');
        });
        ConfigureExpress(app); 




    //setup router
    const router = require('express-promise-router')();
    users.SetRouting(router);
    admin.SetRouting(router);
    home.SetRouting(router);

    app.use(router);
}



    function ConfigureExpress(app){
        require('./passport/passport-local');
        require('./passport/google-passport');

        


        app.use(express.static('public'));
        app.use(cookieParser());
        app.set('view engine', 'ejs');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(expressValidator());
        
         
        

    
         app.use(session({ 

            secret: 'thisisasecret', 
            resave: true,
            saveUninitialized: true,
            store: new MongoStore({ mongoUrl: 'mongodb://localhost/londonmet'}) 
        
        }));
        
        app.use(flash());

        app.use(passport.initialize());
        app.use(passport.session());

        app.locals._ = _;
    }
});