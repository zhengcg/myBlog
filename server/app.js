const Koa=require('koa');
const Static=require('koa-static-cache');
const Router=require('koa-router');
const fs=require('fs');

const userRouter=require('./routers/user');

const app=new Koa();
const router=new Router();
const content=fs.readFileSync(__dirname+'/static/index.html');
app.use(Static(__dirname+'/static',{
	prefix:'/'
}))
router.use('/user',userRouter.routes());
router.get('/',ctx=>{
	
	ctx.body=content.toString();
})

app.use(router.routes());


app.listen(80,()=>{
	console.log("服务启动成功！")
})