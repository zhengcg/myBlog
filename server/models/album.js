const mongoose=require('./db.js');
// 格式化日期的模块
const moment=require('moment');
const Schema=new mongoose.Schema({
	name:String,
	cover:String,
	photo:Array
});

const Model=mongoose.model("album",Schema);
let album={
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
			Model.find({},{name:1,cover:1},(err,res)=>{
				if(err){
					reject(err)
				}else{
					resolve(res)
				}
			})

		})
		
	},
	findById(id){
		return new Promise((resolve,reject)=>{
			Model.findById(id,(err,res)=>{
				if(err){
					reject(err)
				}else{
					resolve(res)
				}
			})

		})
	},
	delete(id){
		return new Promise((resolve,reject)=>{
			Model.deleteOne({_id:id},(err,res)=>{
				if(err){
					reject(err)
				}else{
					resolve(res)
				}
			})

		})

	}

}
module.exports=album