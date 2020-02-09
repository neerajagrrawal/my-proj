var express = require('express') ;
var path = require('path') ;
var mongoose = require('mongoose') ;
var config = require('./config/database') ;
var bodyParser = require('body-parser') ;
var session = require('express-session') ;
var passport = require('passport') ;

mongoose.connect(config.db,{useNewUrlParser: true, useUnifiedTopology: true}).
  then(error => console.log(error),()=> console.log('Connected to mongodb') );

var app=express() ;

app.use(bodyParser.urlencoded({ extended: false })) ;
app.use(bodyParser.json()) ;

app.set('view engine', 'ejs') ;


app.use('/admin/pages',require('./routes/admin_pages')) ;
app.use('/',require('./routes/pages')) ;

var port = 3000 ;
app.listen(port, ()=>{
  console.log('Server started on port '+port);
})
