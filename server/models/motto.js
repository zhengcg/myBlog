const mongoose=require('./db.js');
// 格式化日期的模块
const moment=require('moment');
const Schema=new mongoose.Schema({
	date:{type: String,default: moment().format('YYYY-MM-DD HH:mm:ss')},
	autograph:String
});

const Model=mongoose.model("motto",Schema);
let motto={
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
	update(id,info){
		return new Promise((resolve,reject)=>{
			Model.updateOne({_id:id},{$set:info},(err,res)=>{
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
module.exports=motto