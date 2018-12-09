// http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html

const jwt = require('jsonwebtoken');

let token={
	createToken(userid){
		let secret="leisiniyebuzhidao"
		const token=jwt.sign(
			{
				userid:userid //生成token的主体信息
			},
			secret,     //秘钥
			{
				expiresIn:60*60
			}
		)
		return token
	},
	checkToken(){
		return async (ctx,next)=>{
			if(ctx.request.header['authorization']){
				let token=ctx.request.header['authorization'].split(' ')[1];
				let secret="leisiniyebuzhidao";
				await jwt.verify(token,secret,(err,decode)=>{
					if(err){ //失效或伪造token
						console.log("token失效")
						ctx.body={
							code:401,
							message:"token失效"
						}
					}else{
						console.log("token验证通过");
						return next();
						
					}
				})



			}else{
				ctx.body={
						code:401,
						message:"没有token"
					}

			}
		}
	}
}

module.exports=token;