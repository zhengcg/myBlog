const Router=require('koa-router');
const model=require('../models/note');
const token=require('./token');
const moment=require('moment');
const note=new Router();
note.get('/find',async ctx=>{
	// console.log(ctx.query.currentPage,ctx.query.pageSize);
	let currentPage= parseInt(ctx.query.currentPage);
	let pageSize= parseInt(ctx.query.pageSize);
	let info={}
	if(ctx.query.label){
		info={label:ctx.query.label};
	}
	
	let res=await model.find(currentPage,pageSize,info);
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
note.get('/findTen',async ctx=>{	
	let info={}
	if(ctx.query.label){
		info={label:ctx.query.label};
	}
	let res=await model.findTen(info);
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

note.get('/findById',async ctx=>{
	let res=await model.findById(ctx.query.id);
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

})
note.get('/delete',token.checkToken(),async ctx=>{
	let res=await model.delete(ctx.query.id);
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

note.post('/create',token.checkToken(),async ctx=>{
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

module.exports=note;