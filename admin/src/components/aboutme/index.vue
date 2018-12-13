<template>
	<div id="noticeDiv">
		<div class="targ">
			<ol class="breadcrumb">
				<li>关于我</li>
			</ol>
		</div>
		<div class="mainBox">
			<div class="titHead">
				<el-row>
				  <el-col :xs="24" :sm="14" :md="14" :lg="8" :xl="8">
				  	<h1 class="page-title txt-color-blueDark"><i class="fa fa-address-card fa-fw"></i> 关于我 </h1>			  	
				  </el-col>
				</el-row>
			</div>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
				    <span>基本信息</span>
				    <a href="javascript:;" class="pull-right" @click="basePop=true">编辑</a>
				 </div>
			    <el-row class="row-bg" :gutter="20" v-if="data._id">
				  <el-col :span="3">
				  	<div class="headBox">
				  		<img :src="headImg" alt="" v-if="data.head">
				  		<img src="../../assets/images/head.png" alt="" v-else>
				  	</div>
				  </el-col>
				  <el-col :span="8">
				  	<div class="userInfoBox">
				  		<p>姓&emsp;&emsp;名：{{data.name}}</p>
				  		<p>毕业学校：{{data.school}}</p>
				  		<p>专&emsp;&emsp;业：{{data.major}}</p>
				  		
				  	</div>
				  </el-col>
				  <el-col :span="8">
				  	<div class="userInfoBox">
				  		<p>职&emsp;业：{{data.Occupation}}</p>
				  		<p>手机号：{{data.mobile}}</p>
				  		<p>邮&emsp;箱：{{data.email}}</p>
				  		
				  	</div>
				  </el-col>
				</el-row>
				<p v-else style="text-align:center">暂无数据</p>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
				    <span>自我介绍</span>
				    <a href="javascript:;" class="pull-right" @click="introPop=true">编辑</a>
				 </div>
				 <pre v-if="data._id">
				 <div v-html="data.introduce">
				 </div>
				 	
				 </pre>
				 <p v-else style="text-align:center">暂无数据</p>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
				    <span>技能</span>				    
				 </div>
				<el-tag
				  :key="tag"
				  v-for="tag in data.skill"
				  closable
				  :disable-transitions="false"
				  @close="handleClose(tag)">
				  {{tag}}
				</el-tag>
				<el-input
				  class="input-new-tag"
				  v-if="inputVisible"
				  v-model="inputValue"
				  ref="saveTagInput"
				  size="small"
				  @keyup.enter.native="handleInputConfirm"
				  @blur="handleInputConfirm"
				>
				</el-input>
				<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
			</el-card>				
						
		</div>



		<el-dialog title="修改基本信息" :visible.sync="basePop" width="40%">
		  <el-form label-position="right" label-width="100px" :model="data">
			  <el-form-item label="姓名">
			    <el-input v-model="data.name" type="text" clearable></el-input>
			  </el-form-item>
			  <el-form-item label="毕业学校">
			    <el-input v-model="data.school" type="text" clearable></el-input>
			  </el-form-item>
			  <el-form-item label="专业">
			    <el-input v-model="data.major" type="text" clearable></el-input>
			  </el-form-item>
			  <el-form-item label="职业">
			    <el-input v-model="data.Occupation" type="text" clearable></el-input>
			  </el-form-item>
			  <el-form-item label="手机号">
			    <el-input v-model="data.mobile" type="text" clearable></el-input>
			  </el-form-item>
			  <el-form-item label="邮箱">
			    <el-input v-model="data.email" type="text" clearable></el-input>
			  </el-form-item>
			  <el-form-item label="头像">
			    <el-upload class="upload-demo" drag :action="fileup" name="file" :show-file-list="false" :on-success="preview" :before-upload="beforeAvatarUpload">
	              <i class="el-icon-upload"></i>
	              <div class="el-upload__text">将图片拖到此处，或<em  style="font-style: normal">点击上传</em></div>
	              <div class="imgBox" v-show="headImg">
	                <img :src="headImg" alt="">
	              </div>
	            </el-upload>
			  </el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="basePop = false">取 消</el-button>
		    <el-button type="primary" @click="saveBase">保 存</el-button>
		  </span>
		</el-dialog>

		<el-dialog title="自我介绍" :visible.sync="introPop" width="40%">
		  <el-form label-position="right"  :model="data">
			  <el-form-item >
			    <el-input type="textarea" v-model="data.introduce" placeholder="自我介绍" :rows="10"></el-input>
			  </el-form-item>
			  
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="introPop = false">取 消</el-button>
		    <el-button type="primary" @click="saveBase">保 存</el-button>
		  </span>
		</el-dialog>


	</div>
</template>
<script>
import api from '../../api'
	export default{
		data(){
			return {
		        
		        data:{},
		        basePop:false,
		        introPop:false,
		        inputVisible: false,
        		inputValue: '',
        		fileup:api.file,
        		headImg:"",
				
				
			}
		},
		computed:{

		},
		created(){
			this.getInfo();	

		},
		mounted(){
			
		},
		methods:{
		  handleClose(tag) {
	        this.data.skill.splice(this.data.skill.indexOf(tag), 1);
	        this.saveBase();
	      },

	      showInput() {
	        this.inputVisible = true;
	        this.$nextTick(_ => {
	          this.$refs.saveTagInput.$refs.input.focus();
	        });
	      },

	      handleInputConfirm() {
	        let inputValue = this.inputValue;
	        if (inputValue) {
	          this.data.skill.push(inputValue);
	          this.saveBase();
	        }
	        this.inputVisible = false;
	        this.inputValue = '';
	        
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
		      self.headImg=response.baseUrl+response.filename;		      
		      self.data.head=response.filename;
		      // if(response.code==0){
		      // 	self.data.head=response.result[0];
		      // }else{
		      //   self.$message({
		      //     message: response.message,
		      //     type: 'warning'
		      //   });

		      // }
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
	          url:api.aboutme,
	        }).then(function (res) {       
	            if(res.data.code==0){
	              loading.close();
	              self.data=res.data.data;
	              if(self.data.head){
						self.headImg=res.data.baseUrl+res.data.data.head;
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
	      saveBase(){
	      	var self=this;
	      	const loading=self.$loading({
	          lock: true,
	          text: '请求中……',
	          spinner: 'el-icon-loading',
	          background: 'rgba(0, 0, 0, 0.7)'
	        });
	        
	        self.axios({
	          method: 'post',
	          url:api.updateAbout,
	          data:self.data
	        }).then(function (res) {       
	            if(res.data.code==0){
	              loading.close();
	              self.$message({
	                    message:"保存成功",
	                    type: 'warning'
	                  });
	              self.basePop=false;
	              self.introPop=false;
	              self.getInfo();
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
#noticeDiv{
	h3{
		text-align:center;
		font-size:20px;
	}
	.time{
		text-align:center;
		color:#999;
		font-size:12px;
		line-height:40px;
	}
	.box-card{
		a.pull-right{
			color:#fff;
			&:hover{
				text-decoration:underline
			}
		}
	}
	.headBox{
		img{
			width:100%;
		}
	}
	.userInfoBox{
		p{
			line-height:1.5;
			margin-bottom:15px;
		}
	}
	.el-tag {
	    margin-right: 10px;
	    margin-bottom:10px;
	  }
	  .button-new-tag {
	    height: 32px;
	    line-height: 30px;
	    padding-top: 0;
	    padding-bottom: 0;
	  }
	  .input-new-tag {
	    width: 90px;
	    vertical-align: top;
	  }
}
</style>