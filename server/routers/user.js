const Router=require('koa-router');
const sha1 = require('sha1');
const model=require('../models/user.js');
const token=require('./token');
const user=new Router();

user.post('/login',async ctx=>{
	let info={
		username:ctx.request.body.username,
		password:sha1(ctx.request.body.password),
		token:token.createToken(ctx.request.body.username)
	}
	let user=await model.find();
	if(user){
		if(user[0].username==info.username&&user[0].password==info.password){
			let isOK=await model.login(info);
			if(isOK.ok){
				ctx.body={
					code:0,
					data:info,
					message:"登陆成功"
				};	

			}else{
				ctx.body={
					code:1,
					data:"",
					message:"数据库查询错误"
				}
			}
					
		}else{
			ctx.body={
				code:2,
				data:"",
				message:"用户名或密码错误"
			}
		}
	}else{
		ctx.body={
				code:1,
				data:"",
				message:"数据库查询错误"
			}

	}
});

user.post('/update',token.checkToken(),async ctx=>{
	let info={
		id:ctx.request.body.id,
		username:ctx.request.body.username,
		password:ctx.request.body.password
	}
	let isOK=await model.update(info);
	if(isOK.ok){
		ctx.body={
			code:0,
			data:"",
			message:"修改成功"
		};
	}else{
		ctx.body={
			code:1,
			data:"",
			message:"数据库查询错误"
		}
	}
	
})

user.get('/find',token.checkToken(),async ctx=>{
	let user=await model.find();
	if(user){
		ctx.body={
			code:0,
			data:user,
			message:"获取成功"

		};
	}else{
		ctx.body={
				code:1,
				data:"",
				message:"数据库查询错误"
			}

	}
	
})

module.exports=user;