var express= require('express') ;
var router = express.Router() ;
var Page = require('../models/page') ;

const { check, validationResult } = require('express-validator');

router.get('/',(req,res)=>{
  res.send('admin area') ;
}) ;

router.get('/add-page',(req,res)=>{
  var title= "" ;
  var slug="" ;
  var content="" ;
  var errors = req.flash('errors') ;
  var success = req.flash('success') ;

  res.render('admin/add_page',{
    title:title,
    slug:slug,
    content:content,
    errors : errors,
    success : success
  })
}) ;

router.post('/add-page',[
  check('title').not().isEmpty().withMessage('Title must not be empty'),
  check('content').not().isEmpty().withMessage('Content must not be empty')
],
    (req,res)=>{
console.log('inside post req');

  const errors = validationResult(req);
  var title = req.body.title ;
  var slug = req.body.slug ;
  var content = req.body.content ;

  if (!errors.isEmpty()) {
    req.flash('errors',errors.errors) ;
    res.redirect('/admin/pages/add-page') ;
  }else{
    console.log('nothing is empty');
    Page.findOne({slug:slug},(err,page)=>{
      console.log('inside finding slug in db');
      if(page){
        req.flash('danger','Page slug exists, use another') ;
        res.render('admin/add_page',{
          title:title,
          slug:slug,
          content:content
        }) ;
      }else{
        var page = new Page({
          title: title,
          slug: slug,
          content: content,
          sorting : 0
        }) ;
        console.log('Now saving in db');
        page.save((err)=>{
          if(err)
            console.log(err);
          else {
            console.log('saved in db');
            req.flash('success', 'Page created succesfully') ;
            console.log('everything success');
            res.redirect('/admin/pages/add-page') ;
          }
        }) ;
      }


    }) ;

  }
}) ;

module.exports = router ;
