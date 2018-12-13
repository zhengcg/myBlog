const mongoose=require('./db.js');
// 格式化日期的模块
const moment=require('moment');
const Schema=new mongoose.Schema({
	title:String,
	date:{type: String,default: moment().format('YYYY-MM-DD HH:mm:ss')},
	content:String

});

Schema.statics.findPage=function(currentPage,pageSize,callback){
	
	this.countDocuments({},(err,count)=>{
		if(!err){
			this.find({})
	        .skip((currentPage-1)*pageSize)
	        .limit(pageSize)
	        .sort({'_id':-1})
	        .exec((error,res)=>{
	        	if(!err){
	        		callback(null,{count,res})
	        	}else{
	        		callback(error)
	        	}
	        })
			
		}else{
			callback(err)
		}

	});
	
    

	
}
const Model=mongoose.model("journal",Schema);

let journal={
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

	},

	find(currentPage,pageSize){
		return new Promise((resolve,reject)=>{			
			Model.findPage(currentPage,pageSize,(err,res)=>{
				if(err){
					reject(err);
				}else{
					resolve(res)
				}
			});

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


	}


}

module.exports=journal