var express= require('express') ;
var router = express.Router() ;
var Page = require('../models/page') ;

const { check, validationResult } = require('express-validator');

router.get('/',(req,res)=>{
  Page.find({}).sort({sorting:1}).exec(function(err,pages){
    res.render('admin/pages',{
      pages:pages
    }) ;
  }) ;
}) ;

router.get('/add-page',(req,res)=>{
  var title= req.flash('title') ;
  var slug= req.flash('slug') ;
  var content= req.flash('content') ;
  var errors = req.flash('errors') ;
  var success = req.flash('success') ;
  var danger = req.flash('danger') ;

  res.render('admin/add_page',{
    title:title,
    slug:slug,
    content:content,
    errors : errors,
    success : success,
    danger:danger
  })
}) ;

router.post('/add-page',[
  check('title').not().isEmpty().withMessage('Title must not be empty'),
  check('content').not().isEmpty().withMessage('Content must not be empty')
],
    (req,res)=>{

console.log('inside post');
  const errors = validationResult(req);
  var title = req.body.title ;
  var slug = req.body.slug ;
  var content = req.body.content ;
  req.flash('title',title) ;
  req.flash('slug',slug) ;
  req.flash('content',content) ;

  if (!errors.isEmpty()) {
    req.flash('errors',errors.errors) ;
    res.redirect('/admin/pages/add-page') ;
  }else{

    Page.findOne({slug:slug},(err,page)=>{

      if(page){
        req.flash('danger','Page slug exists, use another') ;
        res.redirect('/admin/pages/add-page') ;
      }else{
        var page = new Page({
          title: req.flash('title')[0] ,
          slug: req.flash('slug')[0] ,
          content: req.flash('content')[0],
          sorting : 100
        }) ;

        page.save((err)=>{
          if(err)
            console.log(err);
          else {
            req.flash('success', 'Page created succesfully') ;
            res.redirect('/admin/pages/add-page') ;
          }
        }) ;
      }


    }) ;

  }
}) ;

module.exports = router ;
