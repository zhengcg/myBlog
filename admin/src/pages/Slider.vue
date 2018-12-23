<template>
	<div>
	  <el-col class="hidden-xs-only" :xs="24" :sm="8" :md="6">
	  	<el-card class="box-card" style="margin-bottom:20px;">
	  		<!-- <div slot="header" class="clearfix">
			    <span>关于我</span>
			    <el-button style="float: right; padding: 3px 0" type="text">详细<i class="el-icon-arrow-right el-icon--right"></i></el-button>
			</div> -->
		  	<div class="aboutBox">
		  		<div class="head">
		  			<img src="../assets/images/code.png">
		  		</div>
		  		<!-- <p>姓名：郑春光</p>
		  		<p>电话：18910232146</p>
		  		<p>职业：web前端开发工程师</p> -->
		  	</div>
		</el-card>
		<el-card class="box-card" style="margin-bottom:20px;">
	  		<div slot="header" class="clearfix">
			    <span style="vertical-align: middle"><i class="fa fa-graduation-cap fa-fw" style="color:#409EFF"></i> 学习笔记</span>
			    <el-button style="float: right; padding: 3px 0" type="text"  @click="gotoDiary">查看<i class="el-icon-arrow-right el-icon--right"></i></el-button>
			</div>
		  	<div class="noteBox">
		  		<el-tag v-for="item in labels" :key="item._id" @click.native="gotoDiary(item)">{{item.name}}</el-tag>
		  	</div>
		</el-card>
		<el-card class="box-card" style="margin-bottom:20px;">
	  		<div slot="header" class="clearfix">
			    <span style="vertical-align: middle"><i class="fa fa-coffee fa-fw" style="color:#409EFF"></i> 生活随笔</span>
			    <el-button style="float: right; padding: 3px 0" type="text" @click.native="gotoArticle">更多<i class="el-icon-arrow-right el-icon--right"></i></el-button>
			</div>
		  	<div class="blogBox">
		  		<p v-for="item in blog" :key="item._id"><router-link :to="{ name: 'articleDetail', query: { id: item._id }}">{{item.title}}</router-link></p>
		  	</div>
		</el-card>
		<el-card class="box-card" style="margin-bottom:20px;">
	  		<div slot="header" class="clearfix">
			    <span style="vertical-align: middle"><i class="fa fa-camera fa-fw" style="color:#409EFF"></i> 相册</span>
			    <el-button style="float: right; padding: 3px 0" type="text">查看<i class="el-icon-arrow-right el-icon--right"></i></el-button>
			</div>
		  	<div class="photoBox">
		  		<el-row :gutter="10">
				  <el-col :span="12"  v-for="item in album" :key="item._id">
				  	<div class="box">
				  		<img :src="item.cover">			
				  		<div class="photoName">{{item.name}}</div>  		
				  	</div>
				  </el-col>
				</el-row>
		  	</div>
		</el-card>
	  </el-col>
	</div>
</template>
<script>
	import api from '../api';
	export default{
		data(){
			return {
				album:[],
				blog:[],
				labels:[]
				
			}
		},
		
		created(){
			this.getAlbum();
			this.getBlog();
			this.getLabel();
		},
		methods:{
			getAlbum(){
				let self=this;
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
		              self.album=res.data.data;
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
			getBlog(){
				var self=this;
		      	const loading=self.$loading({
		          lock: true,
		          text: '请求中……',
		          spinner: 'el-icon-loading',
		          background: 'rgba(0, 0, 0, 0.7)'
		        });
		        
		        self.axios({
		          method: 'get',
		          url:api.journalList,
		          params:{
		          	currentPage:1,
		        	pageSize:5
		          }      
		        }).then(function (res) {       
		            if(res.data.code==0){
		              loading.close();
		              self.blog=res.data.data.res;
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
			getLabel(){
				var self=this;
		      	const loading=self.$loading({
		          lock: true,
		          text: '请求中……',
		          spinner: 'el-icon-loading',
		          background: 'rgba(0, 0, 0, 0.7)'
		        });
		        
		        self.axios({
		          method: 'get',
		          url:api.labelList    
		        }).then(function (res) {       
		            if(res.data.code==0){
		              loading.close();
		              self.labels=res.data.data;
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
			gotoDiary(item){

				if(item._id){
					this.$router.push({
						name:'diary',
						query:{id:item._id,name:item.name}
					})
				}else{
					this.$router.push({
						name:'diary'
					})

				}
			},
			gotoArticle(){

				this.$router.push({
					name:'article'
				})
			}

		}
	}
</script>
<style scoped lang="scss">
.aboutBox{
	p{line-height:30px;}
	.head{
		img{width:100%;}
	}
}
.noteBox{
	.el-tag{margin:5px;cursor:pointer}
}
.blogBox{
	p{line-height:30px;border-bottom:1px solid #ecf5ff;}
	p:last-of-type{border:none;}
	a{
		display: block;
	    white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    font-size:13px;
	    color:#888;
	    &:hover{
	    	color:#409EFF;
	    	font-size:14px;
	    }
	}
}
.photoBox{
	.box{
		margin-bottom:10px;
		img{width:100%};
		position:relative;
		.photoName{
			position:absolute;
			width:100%;
			height:20px;
			line-height:20px;
			background:rgba(0,0,0,0.5);
			text-align:center;
			bottom:0;
			font-size:10px;
			color:#fff;
		}
	}
}

</style>