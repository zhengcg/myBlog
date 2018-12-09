const Router=require('koa-router');
const multer = require('koa-multer');
const path=require('path');
const fs=require('fs');
const file=new Router();

const storage = multer.diskStorage({
  destination:'./uploads/'+new Date().getFullYear() + (new Date().getMonth()+1) + new Date().getDate(),
  filename(ctx,file,cb){
    const filenameArr = file.originalname.split('.');
    cb(null,Date.now() + '.' + filenameArr[filenameArr.length-1]);
  }
});

const upload = multer({storage});

file.post('/upload/head',upload.single('file'),async ctx=>{
	console.log(ctx.req.file);
	ctx.body="上传文件";
})

module.exports=file;