var express= require('express') ;
var router = express.Router() ;

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
})

module.exports = router ;
