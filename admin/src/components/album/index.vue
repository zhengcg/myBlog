<template>
	<div id="user">
		<div class="targ">
			<ol class="breadcrumb">
				<li>相册管理</li>
			</ol>
		</div>
		<div class="mainBox">
			<div class="titHead">
				<el-row>
				  <el-col :xs="24" :sm="14" :md="14" :lg="8" :xl="8">
				  	<h1 class="page-title txt-color-blueDark"><i class="fa fa-camera fa-fw"></i> 相册管理</h1>			  	
				  </el-col>
				  <el-col :xs="24" :sm="10" :md="10" :lg="16" :xl="16">
				  	<div class="titHeadTab">
				  		<el-button type="primary" size="small"  @click="addFn">新建相册</el-button>	
					</div>
				  </el-col>
				</el-row>
			</div>
			<el-card class="box-card">
				<el-table :data="data" border size="small" style="width: 100%">
				    <el-table-column prop="name" label="相册名"></el-table-column>
				    <el-table-column label="封面缩略图">
				    	<template slot-scope="scope">
				    		<el-popover
							    placement="right"
							    title="封面图"
							    width="200"
							    trigger="hover"
							    >
							    <img :src="scope.row.cover" alt="" style="width:200px;">
				        		<img :src="scope.row.cover" alt="" style="width:30px;" slot="reference">
				            </el-popover>
				        </template>
				    </el-table-column>
				    <el-table-column label="操作">
				        <template slot-scope="scope">
				        	<el-button type="text" size="small" @click="editFn(scope.row._id,scope.row.name,scope.row.cover)">编辑</el-button>
				        	<el-button type="text" size="small" @click="remove(scope.row._id)">删除</el-button>
				        	<el-button type="text" size="small" @click="gotoDetail(scope.row._id)">查看</el-button>
				        </template>
			        </el-table-column>
				</el-table>			
			</el-card>
						
		</div>




		<!-- 新建相册 -->
		<el-dialog :title="title" :visible.sync="dialogVisible" width="40%" @close="cancel">
		  <el-form label-position="right" label-width="80px" :model="addForm" >
			   <el-form-item label="相册名">
			    <el-input v-model="addForm.name"></el-input>
			  </el-form-item>
			  <el-form-item label="封面图">
			    <el-upload class="upload-demo" drag :action="fileup" name="file" :show-file-list="false" :on-success="preview" :before-upload="beforeAvatarUpload" :headers="headers">
	              <i class="el-icon-upload"></i>
	              <div class="el-upload__text">将图片拖到此处，或<em  style="font-style: normal">点击上传</em></div>
	              <div class="imgBox" v-show="addForm.cover">
	                <img :src="addForm.cover" alt="">
	              </div>
	            </el-upload>
			  </el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible=false">取 消</el-button>
		    <el-button type="primary" @click="addAlbum">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
import api from '../../api'
	export default{
		data(){
			return {
				fileup:api.file,
        		headers:{
        			authorization:`token ${this.$store.state.token}`
        		},
        		dialogVisible:false,
        		addForm:{
        			name:'',
        			cover:''
        		},
        		title:"新建相册",
        		data:[]
				
			}
		},
		computed:{

		},
		created(){
			this.getList();

		},
		mounted(){
			
		},
		methods:{
	      // 获取相册列表
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
	          url:api.albumFind     
	        }).then(function (res) {       
	            if(res.data.code==0){
	              loading.close();
	              self.data=res.data.data;
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
	      beforeAvatarUpload(file) {
		      const isLt2M = file.size / 1024 / 1024 < 5;

		     
		      if (!isLt2M) {
		        this.$message.error('上传图片大小不能超过 5MB!');
		      }
		      return isLt2M;
		    },
		    preview(response, file, fileList) {
		      var self=this;	      
		      self.addForm.cover=response.baseUrl+response.filename;
	      },

	      cancel(){
	      	var self=this;
	      	self.title="新建相册";
	      	self.addForm={
	            	 	name:'',
	            	 	cover:''

	            	 }

	      },
	      addFn(){
	      	var self=this;
	      	self.dialogVisible=true;
	      },
	      editFn(id,name,cover){
	      	let self=this;
	      	self.addForm={
	      		_id:id,
	      		name:name,
	      		cover:cover
	      	};
	      	self.title="编辑相册";
	      	self.dialogVisible=true;
	      },
	      
	      addAlbum(){
	      	var self=this;
	      	if(self.validate()){
	      		let url=api.albumCreate;
	      		if(self.title=="编辑相册"){
	      			url=api.albumUpdate;
	      		}
	      		
	      		const loading=self.$loading({
		          lock: true,
		          text: '请求中……',
		          spinner: 'el-icon-loading',
		          background: 'rgba(0, 0, 0, 0.7)'
		        });		        
		        self.axios({
		          method: 'post',
		          url:url,
		          data:self.addForm
		        }).then(function (res) {
	            loading.close();
	            if(res.data.code==0){
	            	 self.dialogVisible=false; 
	                 self.$message({
	                  message:"操作成功",
	                  type: 'success'
	                }); 
	                
	                self.getList();                  

	              }else{
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
	      validate(){
	      	var self=this;
	      	var flag=false;
	      	if(self.addForm.name==""){
	      		flag=false;
	      		self.$message({
		          message: "请填写相册名",
		          type: 'warning'
		        });
	      	}else if(self.addForm.cover==""){
	      		flag=false;
	      		self.$message({
		          message: "请上传封面图",
		          type: 'warning'
		        });
	      	}else{
	      		flag=true;
	      	}
	      	return flag;
	      },
	      gotoDetail(id){
	      	this.$router.push({
	      		name:'albumDetail',
	      		query:{id:id}
	      	})

	      },
	      remove(id){
	      	let self=this;
	      	self.$confirm('确定要删除吗？', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {

	        	const loading=self.$loading({
		          lock: true,
		          text: '请求中……',
		          spinner: 'el-icon-loading',
		          background: 'rgba(0, 0, 0, 0.7)'
		        });
		        
		        self.axios({
		          method: 'get',
		          url:api.albumDelete,
		          params:{id:id}
		        }).then(function (res) {       
		            if(res.data.code==0){
		              loading.close();
		              self.$message({
		                    message:"删除成功",
		                    type: 'warning'
		                  });
		              
		                self.getList()

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
	            
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
	      }
	      //
	      

		}
	}
</script>
<style scoped lang="scss">

</style>