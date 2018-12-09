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
	introduce:String,
	works:Array
});
const Model=mongoose.model("AboutMe",Schema);

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