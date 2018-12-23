<template>
	<div>
		<div class="bannerBox">
			<img src="../assets/images/banner.jpg">
			<div class="textBox">
				<h1>{{motto.autograph}}</h1>
				<p>—— {{motto.date}}</p>
			</div>
		</div>
	  	<el-card class="box-card" style="margin-bottom:20px" v-for="item in data" :key="item._id">
		  <div slot="header" class="clearfix headBox" @click="gotoDetail(item._id)">
		    <span>{{item.title}}</span>
		    <span class="pull-right hidden-xs-only" ><i class="el-icon-time"></i> {{item.date}}</span>
		  </div>
		  <div class="bodyBox">
		  	<div class="tipBox">
		  		<label>标签：{{item.label}}<span class="pull-right"><i class="el-icon-time"></i> {{item.date}}</span></label>
		  		<label>关键字：<span v-for="i in item.key">{{i}}</span></label>
		  	</div>
		  	<div class="bodyContent">
		  		{{item.remark}}
		  	</div>
		  </div>
		</el-card>
		<el-card class="box-card">
			<router-link to="/diary" class="more">查看更多</router-link>
		</el-card>
			
	</div>
</template>
<script>
	import api from '../api';
	export default{
		data(){
			return {
				motto:{},
				data:[]
				
				
			}
		},
		
		created(){
			this.getMotto();
			this.getData();
			
		},
		methods:{
			getMotto(){
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
		              	self.motto=res.data.data;
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
			getData(){
				var self=this;
		      	const loading=self.$loading({
		          lock: true,
		          text: '请求中……',
		          spinner: 'el-icon-loading',
		          background: 'rgba(0, 0, 0, 0.7)'
		        });
		        self.axios({
		          method: 'get',
		          url:api.noteTen     
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
			gotoDetail(id){
				this.$router.push({
					name:'diaryDetail',
					query:{id:id}
				})
			}
			

		}
	}
</script>
<style scoped lang="scss">
.bannerBox{
	img{
		width:100%;
	}

	position:relative;
	margin-bottom:20px;
	border-radius:4px;
	overflow:hidden;
	box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
	.textBox{
		width:100%;
		height:100px;
		position:absolute;
		background:rgba(0,0,0,0.3);
		left:0;
		top:50%;
		margin-top:-50px;
		color:#fff;
		box-sizing:border-box;
		padding:0 20px;
		h1{
			padding-top:20px;
			font-size:20px;
			line-height:30px;
		}
		p{
			text-align:right;
		}
	}
}
.more{
	display:block;
	text-align:center;
}
.headBox{
	cursor:pointer;
	&:hover{
		color:#409EFF
	}
}
.bodyBox{
	.tipBox{
		font-size:12px;
		color:#888;
		label{
			margin-right:30px;
			span.pull-right{display:none}
			span{
				padding:0 5px;
			}
		}
	}
	.bodyContent{
		margin-top:20px;
		font-size:14px;
		color:#666;
	}
}
@media screen and ( max-width: 650px ) {
	label{
		display:block;
		margin-right:0!important;
		span.pull-right{display:block!important;}
	}
	.bannerBox{
		.textBox{
			width:100%;
			height:100%;
			top:0;
			margin-top:0;
			h1{
				padding-top:20px;
				font-size:14px;
				line-height:30px;
			}
			p{
				text-align:right;
			}
		}
	}

}

</style>