const Router=require('koa-router');
const model=require('../models/motto');
const token=require('./token');
const moment=require('moment');
const moto=new Router();
moto.get('/find',token.checkToken(),async ctx=>{
	let res=await model.find();
	if(res){
		ctx.body={
			code:0,
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

moto.post('/create',token.checkToken(),async ctx=>{
	let info=ctx.request.body;
	let id=ctx.request.body._id;
	info.date=moment().format('YYYY-MM-DD HH:mm:ss');
	if(id){
		let up=await model.update(id,info);
		if(up){
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
		delete info._id;
		let data=await model.create(info);
		ctx.body={
			code:0,
			data:data,
			message:"保存成功"
		}
	}	
})

module.exports=moto;