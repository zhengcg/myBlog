const Router=require('koa-router');
const model=require('../models/aboutme.js');

const aboutme=new Router();

aboutme.get('/',async ctx=>{
	ctx.body=await model.find();
});

aboutme.post('/create',async ctx=>{
	let info=ctx.request.body;
	if(info._id){
		ctx.body=await model.update(info);
	}else{
		ctx.body=await model.create(info);
	}	
})

module.exports=aboutme;