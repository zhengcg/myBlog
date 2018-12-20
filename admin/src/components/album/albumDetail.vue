<template>
	<div id="notice">
		<div class="targ">
			<ol class="breadcrumb">
				<li>相册管理</li>
				<li>{{data.name}}</li>
			</ol>
		</div>
		<div class="mainBox" >
			<div class="titHead">
				<el-row>
				  <el-col :xs="24" :sm="14" :md="14" :lg="8" :xl="8">
				  	<h1 class="page-title txt-color-blueDark"><i class="fa fa-camera fa-fw"></i> 相册管理 <span>&gt; {{data.name}}</span></h1>			  	
				  </el-col>
				  <el-col :xs="24" :sm="10" :md="10" :lg="16" :xl="16">
				  	<div class="titHeadTab">
					  	<el-button type="primary" size="small" icon="el-icon-back" @click="goBack">返回</el-button>		
					</div>
				  </el-col>
				  
				</el-row>
			</div>
			<el-card class="box-card">
				<el-upload
				  :action="fileup"
				  name="file"
				  :on-success="preview"
				  :before-upload="beforeAvatarUpload"
				  :headers="headers"
				  :file-list="data.photo"
				  list-type="picture-card"
				  :on-preview="handlePictureCardPreview"
				  :on-remove="handleRemove"
				  :show-file-list="true">
				  <i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
				  <img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>		
			</el-card>						
		</div>	
	</div>
</template>
<script>
	import api from '../../api';
	export default{
		data(){
			return {
				 data:{},
				 id:'',
		         fileup:api.file,
		         headers:{
        			authorization:`token ${this.$store.state.token}`
        		 },
        		 dialogImageUrl: '',
        		 dialogVisible: false
				
				
			}
		},
		computed:{

		},
		created(){

			this.id=this.$route.query.id;
			this.getInfo();

		},
		mounted(){

		},
		methods:{		  
	      goBack(){
	      	this.$router.go(-1);
	      },
	      handleRemove(file, fileList) {
	      	let self=this;
	        self.data.photo=self.data.photo.filter(item=>{
	        	return item.name!==file.name;
	        });
	        self.update()

	      },
	      handlePictureCardPreview(file) {
	        this.dialogImageUrl = file.url;
	        this.dialogVisible = true;
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
		      self.data.photo.push({url:response.baseUrl+response.filename,name:response.filename.split(".")[0]});
		      self.update()
	      },
	      update(){
	      	var self=this;      		
	      		const loading=self.$loading({
		          lock: true,
		          text: '请求中……',
		          spinner: 'el-icon-loading',
		          background: 'rgba(0, 0, 0, 0.7)'
		        });		        
		        self.axios({
		          method: 'post',
		          url:api.albumUpdate,
		          data:self.data
		        }).then(function (res) {
	            loading.close();
	            if(res.data.code==0){
	                 self.$message({
	                  message:"操作成功",
	                  type: 'success'
	                }); 	                
	                self.getInfo();                  
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

	      },

	      getInfo(){
	      	var self=this;
	      	const loading=self.$loading({
		          lock: true,
		          text: '请求中……',
		          spinner: 'el-icon-loading',
		          background: 'rgba(0, 0, 0, 0.7)'
		        });
		        self.axios({
		          method: 'get',
		          url:api.albumFindById,
		          params:{    	
		          	id:self.id
		          }      
		        }).then(function (res) {       
		            if(res.data.code==0){
		              loading.close();
		              self.data=res.data.data
		              
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
</script>
<style scoped lang="scss">

</style>