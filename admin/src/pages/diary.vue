<template>
	<div>
		<el-card class="box-card" style="margin-bottom:20px">
			<div slot="header" class="clearfix">
			    <span>标签分类</span>
			  </div>
			<el-tag :class="label._id==0?'el-tag--success':'default'" @click.native="changeLabel(0,'全部')">全部</el-tag>
			<el-tag :class="label._id==item._id?'el-tag--success':'default'" v-for="item in labels" :key="item._id" @click.native="changeLabel(item._id,item.name)">{{item.name}}</el-tag>
		</el-card>
		
	  	<el-card class="box-card" style="margin-bottom:20px" v-for="item in data" :key="item._id"  v-if="total>0">
		  <div slot="header" class="clearfix  headBox" @click="gotoDetail(item._id)">
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
		<el-card v-else><p style="text-align:center">暂无文章</p></el-card>
		
		<el-card class="box-card" v-if="total>0">
			<div class="pageBox">
				  <el-pagination
				    layout="prev, pager, next"
				      @size-change="handleSizeChange"
				      @current-change="handleCurrentChange"
				      :current-page="currentPage"
				      :page-size="pageSize"
				    :total="total">
				  </el-pagination>
			</div>
		</el-card>
			
	</div>
</template>
<script>
	import api from '../api';
	export default{
		data(){
			return {
				total:0,
				label:{_id:0,name:'全部'},
				data: [],
		        labels:[],
		        pageSize:10,
		        currentPage: 1
				
			}
		},
		watch:{
	        '$route.query':function (val) {
	            let id=val.id;
	            let name=val.name;
	            this.label={
					_id:id,
					name:name
				}
				this.getList();			
				
	        }
    	},
		created(){
			this.getLabel();
			if(this.$route.query.id){
				this.label={
					_id:this.$route.query.id,
					name:this.$route.query.name
				}
				
			}
			this.getList();
		},
		methods:{
		  handleSizeChange(val) {
	        this.pageSize=val;
	        this.getList();
	      },
	      handleCurrentChange(val) {
	        this.currentPage=val;
	        this.getList();

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
		      getList(){
		      	var self=this;
		      	const loading=self.$loading({
		          lock: true,
		          text: '请求中……',
		          spinner: 'el-icon-loading',
		          background: 'rgba(0, 0, 0, 0.7)'
		        });
		        let submitData={
		        	currentPage:this.currentPage,
		        	pageSize:this.pageSize

		        }
		        if(self.label._id!==0){
		        	submitData.label=self.label.name;
		        }
		        
		        self.axios({
		          method: 'get',
		          url:api.noteList,
		          params:submitData 
		        }).then(function (res) {       
		            if(res.data.code==0){
		              loading.close();
		              self.total=res.data.data.count;
		              self.data=res.data.data.res;
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
		      changeLabel(_id,name){
		      	this.label={_id,name};
		      	this.currentPage=1;
		      	this.getList();
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
.pageBox{
	text-align:center;
}
.el-tag{
	margin:0 5px;
	cursor:pointer;
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