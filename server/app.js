const Koa=require('koa');
const Static=require('koa-static-cache');
const Router=require('koa-router');
const fs=require('fs');
const bodyParser=require('koa-bodyparser');
const userRouter=require('./routers/user');
const aboutmeRouter=require('./routers/aboutme');

const app=new Koa();
const router=new Router();
app.use(bodyParser());
// 静态目录托管
const content=fs.readFileSync(__dirname+'/static/index.html');
app.use(Static(__dirname+'/static',{
	prefix:'/'
}))
router.get('/',ctx=>{
	ctx.body=content.toString();
})

// 路由
router.use('/user',userRouter.routes());
router.use('/aboutme',aboutmeRouter.routes());
app.use(router.routes());


app.listen(80,()=>{
	console.log("服务启动成功！")
})