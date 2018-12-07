const mongoose=require('mongoose');

const url="mongodb://localhost:27017/blog"

mongoose.connect(url,{useNewUrlParser: true},err=>{
	if(err){
		console.log("数据库连接失败")
	}else{
		console.log("数据库已连接")
	}
});

module.exports=mongoose;


