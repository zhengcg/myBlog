const Router=require('koa-router');
const multer = require('koa-multer');
const path=require('path');
const baseUrl=require('./base.js');
const file=new Router();

const storage = multer.diskStorage({
  destination:function(req,file,cb){
  	cb(null,'./static/upload/')
  },
  filename(req,file,cb){
    const fileFormat = (file.originalname).split('.');
    cb(null,Date.now() + '.' + fileFormat[fileFormat.length-1]);
  }
});

const upload = multer({storage});

file.post('/upload',upload.single('file'),async (ctx,next)=>{
	  ctx.body = {
	  	baseUrl:baseUrl,
	    filename: ctx.req.file.filename  //返回文件名 
	  }

})

module.exports=file;