<template>
	<div id="user">
		<div class="targ">
			<ol class="breadcrumb">
				<li>账户管理</li>
			</ol>
		</div>
		<div class="mainBox">
			<div class="titHead">
				<el-row>
				  <el-col :xs="24" :sm="14" :md="14" :lg="8" :xl="8">
				  	<h1 class="page-title txt-color-blueDark"><i class="fa fa-user fa-fw"></i> 账户管理</h1>			  	
				  </el-col>
				  
				</el-row>
			</div>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
				    <span>管理员账户</span>
				 </div>
				 <div>
				 	<el-form label-position="right"   label-width="100px" :model="user">
						  <el-form-item label="用户名">
						    <el-input v-model="user.username" type="text" clearable></el-input>
						  </el-form-item>
						  <el-form-item label="密码">
						    <el-input v-model="user.password" type="password" clearable></el-input>
						  </el-form-item>
						  <el-form-item>
						    <el-button type="primary" @click="saveWork">保存</el-button>
						  </el-form-item>
						  
					  </el-form>
				 </div>
			</el-card>
						
		</div>
	</div>
</template>
<script>
import api from '../../api'
	export default{
		data(){
			return {
		        user:{
		        	username:'',
		        	password:''
		        	
		        }
				
				
			}
		},
		computed:{

		},
		created(){
			this.getList()
			

		},
		mounted(){
			
		},
		methods:{
	      getList(){
	      	var self=this;
	      	const loading=self.$loading({
	          lock: true,
	          text: '请求中……',
	          spinner: 'el-icon-loading',
	          background: 'rgba(0, 0, 0, 0.7)'
	        });
	        self.axios({
	          method: 'get',
	          url:api.getUser     
	        }).then(function (res) {       
	            if(res.data.code==0){
	              loading.close();
	              self.user=res.data.data[0];
	              
	            }else{
	              loading.close();
	                    
	              self.$message({
	                    message:res.data.message,
	                    type: 'warning'
	                  });  
	                 
	            }

	                   
	          }).catch(function (error) {
	            loading.close();
	            self.$message({
	                    message:error,
	                    type: 'warning'
	                  }); 
	                       　　
	          });

	      },
	      checkPass(pwd){
	        let pwdCheck=/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/;
	        return pwdCheck.test(pwd);

	      },
	      validate(){
	      	let self=this;
	      	let flag=false;
	      	if(self.user.username==""){
	      		flag=false;
	      		self.$message({
                    message:"用户名不能为空",
                    type: 'warning'
                  });  

	      	}else if(self.user.password==""){
	      		flag=false;
	      		self.$message({
                    message:"密码不能为空",
                    type: 'warning'
                  });
	      	}else if(!self.checkPass(self.user.password)){
	      		flag=false;
	      		self.$message({
                    message:"密码需8~20位，不能为纯数字和纯字母",
                    type: 'warning'
                  });
	      	}else{
	      		flag=true;
	      	}
	      	return flag;

	      },
	      saveWork(){
	      	let self=this;
	      	if(self.validate()){
	      		const loading=self.$loading({
		          lock: true,
		          text: '请求中……',
		          spinner: 'el-icon-loading',
		          background: 'rgba(0, 0, 0, 0.7)'
		        });
		        
		        self.axios({
		          method: 'post',
		          url:api.updateUser,
		          data:self.user
		        }).then(function (res) {       
		            if(res.data.code==0){
		              loading.close();
		              self.$message({
		                    message:"保存成功",
		                    type: 'success'
		                  });
		            
		              self.getList();
		            }else{
		              loading.close();
		                    
		              self.$message({
		                    message:res.data.message,
		                    type: 'warning'
		                  });  
		                 
		            }

		                   
		          }).catch(function (error) {
		            loading.close();
		            self.$message({
		                    message:error,
		                    type: 'warning'
		                  }); 
		                       　　
		          });
	      	}
	      	
	      }

	      


		}
	}
</script>
<style scoped lang="scss">
.mottoBox{
	padding:2em;
	font-size:20px;
	p{
		font-size:12px;
		color:#999;
		line-height:30px;
		font-style: italic;
		margin-top:20px;
	}
}
</style>