<template>
	<div>
		<el-card class="box-card" style="margin-bottom:20px;">
			<div class="list"  v-if="total>0" v-for="item in data" :key="item._id" @click="gotoDetail(item._id)">
				<el-row :gutter="10">
				  <el-col :xs="24" :sm="16" :md="18">
				  	<div class="title">{{item.title}}</div>
				  	
				  </el-col>
				  <el-col  :sm="8" :md="6" class="hidden-xs-only">
				  	<div class="time"><i class="el-icon-time"></i> {{item.date}}</div>
				  </el-col>
				</el-row>
			</div>
			<p  v-else style="text-align:center">暂无文章</p>
			
		</el-card>
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
				data: [],
		        pageSize:15,
		        currentPage: 1
				
			}
		},
		
		created(){
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
		        
		        self.axios({
		          method: 'get',
		          url:api.journalList,
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
		      gotoDetail(id){
				this.$router.push({
					name:'articleDetail',
					query:{id:id}
				})
			}

		}
	}
</script>
<style scoped lang="scss">
.list{
	cursor:pointer;
	height:40px;
	line-height:40px;
	border-bottom:1px solid #ebeef5;
	&:last-of-type{border:none;}
	&:hover{
		.title{
			color:#409EFF;
			font-size:14px;
		}
	}

}
.pageBox{
	text-align:center;
}
	.title{
		color:#333;
		white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    font-size:13px;
	}
	.time{
		color:#999;
		font-size:12px;
		text-align:right;
	}
</style>