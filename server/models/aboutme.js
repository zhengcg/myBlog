const mongoose=require('./db.js');
const Schema=new mongoose.Schema({
	head:String,
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
		let json={
			code:0,
			data:"",
			message:""
		}
		Model.create(info,(err,res)=>{
			if(err){
				json={
					code:1,
					data:"",
					message:err
				}
				
			}else{
				json={
					code:0,
					data:res,
					message:"操作成功"
				}
				
			}

			return json
		})
	},

	update(info){
		Model.findOneAndUpdate(info.id,{$set:info},err=>{
			if(err){
				return {
					code:1,
					message:err
				}
			}else{
				return {
					code:0,
					message:"修改成功"
				}
			}
		})
	},

	find(){
		Model.find((err,res)=>{
			if(!err){
				return {
					code:1,
					data:"",
					message:err
				}
			}else{
				return {
					code:0,
					data:res[0],
					message:"请求成功"
				}
			}
		})
	}


}

module.exports=aboutme