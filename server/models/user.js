const mongoose=require('./db.js');
const sha1 = require('sha1');
let Schema=new mongoose.Schema({
	username:String,
	password:String,
	token:String
})

let Model=mongoose.model('User',Schema);
// Model.create({
// 	username:"1083466294",
// 	password:sha1("zcg19890910")
// },(err,user)=>{
// 	if(err){
// 		console.log(err)
// 	}else{
// 		console.log(user)
// 	}
// })
let userModel={
	login(info){
		return new Promise((resolve,reject)=>{
			Model.updateOne({username:info.username},{$set:info},(err,res)=>{
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

module.exports=userModel;

