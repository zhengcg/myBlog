const mongoose=require('mongoose');
const db=require('./db.js');

let UserSchema=new mongoose.Schema({
	username:{type:String},
	usersex:{type:String},
	userage:{type:Number}
})

let UserModel=db.model('User',UserSchema);

function addUser(user){
	let users=new UserModel(user);
	users.save((err,res)=>{
		if(err){
			console.log("Error:"+err)
		}else{
			console.log("Res:"+res)
		}
	})
}

addUser({
	username:"zhengchunguang",
	usersex:"男",
	userage:29
})