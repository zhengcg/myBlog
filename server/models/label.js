const mongoose=require('./db.js');
const Schema=new mongoose.Schema({
	name:String
});

const Model=mongoose.model("label",Schema);

let label={
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

	delete(name){
		return new Promise((resolve,reject)=>{
			Model.deleteOne({name:name},(err,res)=>{
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

module.exports=label