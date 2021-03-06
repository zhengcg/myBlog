const mongoose=require('./db.js');
// 格式化日期的模块
const moment=require('moment');
const Schema=new mongoose.Schema({
	title:String,
	remark:String,
	key:Array,
	label:String,
	date:{type: String,default: moment().format('YYYY-MM-DD HH:mm:ss')},
	content:String,
	html:String

});

Schema.statics.findPage=function(currentPage,pageSize,info,callback){
	
	this.countDocuments(info,(err,count)=>{
		if(!err){
			this.find(info,{title:1,label:1,date:1,key:1,remark:1})
	        .skip((currentPage-1)*pageSize)
	        .limit(pageSize)
	        .exec((error,res)=>{
	        	if(!error){
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

Schema.statics.findTen=function(info,callback){
	this.find(info,{title:1,label:1,date:1,key:1,remark:1})
    .limit(10)
    .sort({'_id':-1})
    .exec((error,res)=>{
    	if(!error){
    		callback(null,res)
    	}else{
    		callback(error)
    	}
    })

}
const Model=mongoose.model("note",Schema);

let note={
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

	find(currentPage,pageSize,info){
		return new Promise((resolve,reject)=>{			
			Model.findPage(currentPage,pageSize,info,(err,res)=>{
				if(err){
					reject(err);
				}else{
					resolve(res)
				}
			});

		})
		
	},
	findTen(info){
		return new Promise((resolve,reject)=>{			
			Model.findTen(info,(err,res)=>{
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

module.exports=note