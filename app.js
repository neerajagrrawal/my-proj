var express = require('express') ;
var path = require('path') ;
var mongoose = require('mongoose') ;
var config = require('./config/database') ;
var bodyParser = require('body-parser') ;
var session = require('express-session') ;
var passport = require('passport') ;
var flash = require('connect-flash') ;


mongoose.connect(config.db,{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

var app=express() ;

app.use(flash()) ;

app.use(bodyParser.urlencoded({ extended: false })) ;
app.use(bodyParser.json()) ;

app.use(session({
  secret: 'keyboard cat',
  saveUninitialized: true
})) ;



app.use(require('connect-flash')());


app.set('view engine', 'ejs') ;



app.use('/admin/pages',require('./routes/admin_pages')) ;
app.use('/',require('./routes/pages')) ;

var port = 3000 ;
app.listen(port, ()=>{
  console.log('Server started on port '+port);
})
