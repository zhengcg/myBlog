const Koa=require('koa');
const Static=require('koa-static-cache');
const Router=require('koa-router');

const userRouter=require('./routers/user');

const app=new Koa();
const router=new Router();


router.use('/user',userRouter.routes());



app.use(router.routes());
app.use(Static(__dirname+'/static',{
	prefix:'/static'
}))

app.listen(80,()=>{
	console.log("服务启动成功！")
})