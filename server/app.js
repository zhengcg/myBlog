const Koa=require('koa');
const fs=require('fs');
const Static=require('koa-static');
const Router=require('koa-router');
const bodyParser=require('koa-bodyparser');
const userRouter=require('./routers/user');
const aboutmeRouter=require('./routers/aboutme');
const work=require('./routers/work');
const file=require('./routers/file');
const moto=require('./routers/moto');
const journal=require('./routers/journal');
const app=new Koa();
const router=new Router();
app.use(bodyParser());
// 静态目录托管
app.use(Static(__dirname+'/static'));
// 路由
router.use('/api/user',userRouter.routes());
router.use('/api/aboutme',aboutmeRouter.routes());
router.use('/api/work',work.routes());
router.use('/api/file',file.routes());
router.use('/api/moto',moto.routes());
router.use('/api/journal',journal.routes());
app.use(router.routes());

app.listen(3000,()=>{
	console.log("服务启动成功！")
})