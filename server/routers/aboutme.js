const Router=require('koa-router');
const model=require('../models/aboutme.js');
const token=require('./token');
const baseUrl=require('./base.js');
const aboutme=new Router();
aboutme.get('/find',async ctx=>{
	let res=await model.find();
	if(res){
		ctx.body={
			code:0,
			baseUrl:baseUrl,
			data:res[0],
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

aboutme.post('/create',token.checkToken(),async ctx=>{
	let info=ctx.request.body;
	if(info._id){
		let up=await model.update(info);
		if(up._id){
			ctx.body={
				code:0,
				data:up,
				message:"修改成功"
			};
		}else{
			ctx.body={
				code:1,
				data:"",
				message:"数据库查询错误"
			}
		}
	}else{
		let data=await model.create(info);
		ctx.body={
			code:0,
			data:data,
			message:"保存成功"
		}
	}	
})

module.exports=aboutme;