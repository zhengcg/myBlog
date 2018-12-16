const Router=require('koa-router');
const model=require('../models/label');
const token=require('./token');
const label=new Router();
label.get('/find',token.checkToken(),async ctx=>{
	let res=await model.find();
	if(res){
		ctx.body={
			code:0,
			data:res,
			message:"获取成功"

		};
	}else{
		ctx.body={
				code:1,
				data:"",
				message:"数据库查询错误"
			}

	}
});


label.get('/delete',token.checkToken(),async ctx=>{
	let res=await model.delete(ctx.query.name);
	if(res){
		ctx.body={
			code:0,
			data:res,
			message:"删除成功"

		};
	}else{
		ctx.body={
				code:1,
				data:"",
				message:"数据库查询错误"
			}

	}

})

label.post('/create',token.checkToken(),async ctx=>{
	let info=ctx.request.body;
	let data=await model.create(info);
	ctx.body={
		code:0,
		data:data,
		message:"保存成功"
	}		
})

module.exports=label;