const mongoose=require('./db.js');
const Schema=new mongoose.Schema({
	head:String,
	name:String,
	school:String,
	major:String,
	Occupation:String,
	mobile:String,
	email:String,
	skill:Array,
	introduce:String
});
const Model=mongoose.model("AboutMe",Schema);
// Model.create({
// 	name:"郑春光",
// 	school:"南昌大学",
// 	major:"信息管理与信息系统",
// 	Occupation:"web前端开发工程师",
// 	mobile:"18910232146",
// 	email:"1083466294@qq.com",
// 	skill:["html"],
// 	introduce:"ss"
// },(err,res)=>{
// 	if(!err){
// 		console.log(res);
// 	}
// })
let aboutme={
	create(info){
		return new Promise((resolve,reject)=>{
			Model.create(info,(err,res)=>{
				if(err){
					reject(err)
					
				}else{
					resolve(res)
					
				}
			})

		})
		
	},

	update(info){
		return new Promise((resolve,reject)=>{
			Model.findOneAndUpdate(info.id,{$set:info},(err,res)=>{
				if(err){
					reject(err)
				}else{
					resolve(res)
				}
			})

		})
		
	},

	find(){
		return new Promise((resolve,reject)=>{
			Model.find((err,res)=>{
				if(err){
					reject(err)
				}else{
					resolve(res)
				}
			})

		})
		
	}


}

module.exports=aboutme