<template>
	<div id="notice">
		<div class="targ">
			<ol class="breadcrumb">
				<li>公告管理</li>
				<li>{{fTitle}}</li>
			</ol>
		</div>
		<div class="mainBox" >
			<div class="titHead">
				<el-row>
				  <el-col :xs="24" :sm="14" :md="14" :lg="8" :xl="8">
				  	<h1 class="page-title txt-color-blueDark"><i class="fa fa-bullhorn fa-fw"></i> 公告管理 <span>&gt; {{fTitle}}</span></h1>			  	
				  </el-col>
				  <el-col :xs="24" :sm="10" :md="10" :lg="16" :xl="16">
				  	<div class="titHeadTab">
					  	<el-button type="primary" size="small" icon="el-icon-back" @click="goBack">返回</el-button>		
					</div>
				  </el-col>
				  
				</el-row>
			</div>
			<el-card class="box-card" v-show="fTitle!=='查看公告'">
				 <div class="box">
		            <el-input
		              placeholder="请输入标题（建议30字以内）"
		              clearable 
		              maxlength="30"
		              v-model="title">
		            </el-input>
		          </div>
				  <div class="box">
		            <el-upload class="selfImg"  :action="fileup" name="File"  :show-file-list="false" :on-success="insertImg" >
		                      <i id="selfImg"></i>
		             </el-upload>
		            <div class="editor-container">
		              
		              <UE :defaultMsg=content :config=config ref="ue"></UE>
		            </div>
		          </div>
		          <div class="box" style="margin-top:30px;">
					<el-button type="primary" @click="submitFn">提交</el-button>
				  </div>
				

			</el-card>
			<el-card class="box-card" v-show="fTitle=='查看公告'">
				<div id="noticeDiv">
					<div class="box">
						<h3>{{title}}</h3>
						<p class="time"><i class="el-icon-time"></i> {{updateDate}}</p>
					</div>
					<div class="box" v-html="content"></div>
				</div>
				
				
			</el-card>
			
						
		</div>
		
	</div>
</template>
<script>
	import UE from '../common/ue.vue';
	import api from '../../api';
	export default{
		components: {UE},
		data(){
			return {
				config: {
			      initialFrameWidth: null,
			      initialFrameHeight: 220,
			      toolbars: [
			          ['fullscreen','undo', 'redo', '|','fontsize','|','blockquote','horizontal','|','removeformat','formatmatch','|','bold', 'italic','underline','forecolor','backcolor', 'cleardoc','selectall','|','justifyleft','justifycenter','justifyright','justifyjustify','|','rowspacingtop','rowspacingbottom','lineheight','|','insertorderedlist','insertunorderedlist','|','indent','lineheight','|','directionalityltr','directionalityrtl','time','date','|','simpleUpload']
			      ]
			     },
			     content:"请输入正文（建议字数限制在200~10000字以内）",
		         fTitle:"",
		         id:'',
		         title:'',
		         updateDate:'',
		         fileup:api.fileup
				
				
			}
		},
		computed:{

		},
		mounted(){
			//初始化
		   var self=this;
		   this.$refs.ue.editor.addListener("contentChange", function () {
		          self.content= self.$refs.ue.editor.getContent()       
		    });

		},
		watch:{
	        '$route.query':function (val) {
	            let tit=val.tit;
				if(tit==1){
					this.fTitle="增加公告"
					this.id="";
					this.title="";
					this.content="请输入正文（建议字数限制在200~10000字以内）"
				}else if(tit==2){
					this.fTitle="查看公告";
					if(val.id){
						this.id=val.id;
						this.getDetail(val.id)
					}
					
				}else{
					this.fTitle="编辑公告";
					if(val.id){
						this.id=val.id;
						this.getDetail(val.id)
					}

				}
				
				
				
	        }
    	},
		created(){

			let tit=this.$route.query.tit;
			if(tit==1){
				this.fTitle="增加公告";
				this.id="";
				this.title="";
				this.content="请输入正文（建议字数限制在200~10000字以内）"
			}else if(tit==2){
				this.fTitle="查看公告";
				this.getDetail(this.$route.query.id);
				this.id=this.$route.query.id;
			}else{
				this.fTitle="编辑公告";
				this.getDetail(this.$route.query.id);
				this.id=this.$route.query.id;
			}


			
			
		},
		mounted(){
			var self=this;
		   	this.$refs.ue.editor.addListener("contentChange", function () {
		          self.content= self.$refs.ue.editor.getContent()       
		       });
			
		},
		methods:{		  
	      goBack(){
	      	this.$router.go(-1);
	      },
	      insertImg(response, file, fileList) {
	        var self=this;
	        if(response.code==200){
	          self.$refs.ue.insertImg('<img src="'+response.result[0]+'">')
	        }else{
	          self.$message({
	            message: response.message,
	            type: 'warning'
	          });

	        }
	      },
	      getDetail(id){
	      	var self=this;
	      	const loading=self.$loading({
		          lock: true,
		          text: '请求中……',
		          spinner: 'el-icon-loading',
		          background: 'rgba(0, 0, 0, 0.7)'
		        });
		        self.axios({
		          method: 'get',
		          url:api.noticeView,
		          params:{
		          	
		          	id:id
		          }      
		        }).then(function (res) {       
		            if(res.data.code==200){
		              loading.close();
		              self.title=res.data.result.title;
		              self.updateDate=res.data.result.updateDate;
		              self.content=res.data.result.content;
		              self.$refs.ue.editor.setContent(self.content);
		              
		            }else{
		              loading.close();
		                    
		              self.$message({
		                    message:res.data.message,
		                    type: 'warning'
		                  });  
		                 
		            }

		                   
		          }).catch(function (error) {
		            loading.close();
		            // self.$message({
		            //         message:error,
		            //         type: 'warning'
		            //       }); 
		                       　　
		          });

	      },
	      submitFn(){
	      	var self=this;
	      	if(self.title==""){
	      		self.$message({
                    message:"请填写公告标题",
                    type: 'warning'
                  }); 
	      	}else{
	      		const loading=self.$loading({
		          lock: true,
		          text: '请求中……',
		          spinner: 'el-icon-loading',
		          background: 'rgba(0, 0, 0, 0.7)'
		        });
		        self.axios({
		          method: 'post',
		          url:api.noticeSave,
		          data:{
		          	title:self.title,
		          	content:self.content,
		          	id:self.id
		          }      
		        }).then(function (res) {       
		            if(res.data.code==200){
		              loading.close();
		              self.$message({
		                    message:"提交成功",
		                    type: 'warning'
		                  }); 
		              self.$router.push({
		              	name:'notice'
		              })
		              
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
	@import '../../assets/css/notice.scss'
</style>