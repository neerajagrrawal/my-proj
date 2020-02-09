var express= require('express') ;
var router = express.Router() ;
const { check, validationResult } = require('express-validator');

router.get('/',(req,res)=>{
  res.send('admin area') ;
}) ;

router.get('/add-page',(req,res)=>{
  var title= "" ;
  var slug="" ;
  var content="" ;

  res.render('admin/add_page',{
    title:title,
    slug:slug,
    content:content
  })
}) ;

router.post('/add-page',[
  check('title').not().isEmpty().withMessage('Title must not be empty'),
  check('content').not().isEmpty().withMessage('Content must not be empty')
],
(req,res)=>{

  const errors = validationResult(req);
  var title = req.body.title ;
  var slug = req.body.slug ;
  var content = req.body.content ;

  if (!errors.isEmpty()) {
    res.render('admin/add_page',{
      errors : errors.errors,
      title : title,
      slug: slug,
      content : content
    }) ;
  }else{
    console.log('success');
  }




}) ;

module.exports = router ;
