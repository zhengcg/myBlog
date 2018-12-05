const mongoose=require('mongoose');
const url='mongodb://localhost:27017/blog';

const db=mongoose.createConnection(url);

db.on('connected',err=>{
	if(err){
		console.log('连接数据库失败：'+err)
	}else{
		console.log('连接数据库成功！')
	}
})

module.exports=db;
