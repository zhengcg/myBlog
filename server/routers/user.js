const Router=require('koa-router');

const user=new Router();

user.get('/',ctx=>{
	ctx.body="user"
});

module.exports=user;