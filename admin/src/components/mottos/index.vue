<template>
	<div id="user">
		<div class="targ">
			<ol class="breadcrumb">
				<li>说说管理</li>
			</ol>
		</div>
		<div class="mainBox">
			<div class="titHead">
				<el-row>
				  <el-col :xs="24" :sm="14" :md="14" :lg="8" :xl="8">
				  	<h1 class="page-title txt-color-blueDark"><i class="fa fa-bullhorn fa-fw"></i> 说说管理</h1>			  	
				  </el-col>
				  <el-col :xs="24" :sm="10" :md="10" :lg="16" :xl="16">
				  	<div class="titHeadTab">
					  	<el-button type="primary" size="small" @click="workPop=true" v-if="!data.date">发表</el-button>		
					</div>
				  </el-col>
				  
				</el-row>
			</div>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
				    <span>最新状态</span>
				    <a href="javascript:;" style="color:#fff" class="pull-right" @click="editFn" v-if="data.date">修改</a>
				 </div>
				 <div class="mottoBox" v-if="data.date">
				 	<em>{{data.autograph}}</em>
				 	<p>———— {{data.date}}</p>
				 </div>
				 <p style="text-align: center" v-else>暂无数据</p>
			</el-card>
						
		</div>



		<!-- 添加作品 -->
		<el-dialog :title="title" :visible.sync="workPop" width="40%"  @close="closeFn">
		  <el-form label-position="right" :model="addForm">
			  <el-form-item >
			    <el-input type="textarea" v-model="addForm.autograph" placeholder="输入座右铭" :rows="10"></el-input>
			  </el-form-item>
			  
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="workPop = false">取 消</el-button>
		    <el-button type="primary" @click="saveWork">保 存</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
import api from '../../api'
	export default{
		data(){
			return {
		        data:{
		        	autograph:"",
		        	date:""
		        },
		        workPop:false,
		        addForm:{
		        	_id:'',
		        	autograph:''
		        },
		        title:"发表状态"
				
				
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
		  closeFn(){
		  	this.addForm={
		        	_id:'',
		        	autograph:''
		        	
		        };
		        this.title="发表状态"

		  },
	      // 获取代理商列表
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
	          url:api.motoList     
	        }).then(function (res) {       
	            if(res.data.code==0){
	              loading.close();
	              if(res.data.data){
	              	self.data=res.data.data;
	              }else{
	              	self.$message({
	                    message:"没有数据",
	                    type: 'warning'
	                  }); 
	              }
	              
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
		          url:api.motoSave,
		          data:self.addForm
		        }).then(function (res) {       
		            if(res.data.code==0){
		              loading.close();
		              self.$message({
		                    message:"保存成功",
		                    type: 'warning'
		                  });
		            
		              self.workPop=false;
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
	      	
	      },
	      editFn(id){
	      	let self=this;
	      	self.title="修改状态";
	      	self.addForm=self.data;	        
	        self.workPop=true;
	      	
	      	
	      },
	      validate(){
	      	let self=this;
	      	let flag=false;
	      	if(self.addForm.autograph==""){
	      		flag=false;
	      		self.$message({
	              message:"输入座右铭",
	              type: 'warning'
	            }); 
	      	}else{
	      		flag=true;
	      	}
	      	return flag;
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