<template>
	<div id="notice">
		<div class="targ">
			<ol class="breadcrumb">
				<li>生活随笔</li>
			</ol>
		</div>
		<div class="mainBox">
			<div class="titHead">
				<el-row>
				  <el-col :xs="24" :sm="14" :md="14" :lg="8" :xl="8">
				  	<h1 class="page-title txt-color-blueDark"><i class="fa fa-coffee fa-fw"></i> 生活随笔 </h1>			  	
				  </el-col>
				  <el-col :xs="24" :sm="10" :md="10" :lg="16" :xl="16">
				  	<div class="titHeadTab">
					  	<el-button type="primary" size="small" @click="gotoDetail(1,0)">添加</el-button>		
					</div>
				  </el-col>
				  
				</el-row>
			</div>
			<el-card class="box-card">
				<el-table :data="data" border size="small" style="width: 100%">
				    <el-table-column prop="title" label="标题"></el-table-column>
				    <el-table-column prop="date" label="时间"></el-table-column>
				    <el-table-column label="操作">
				        <template slot-scope="scope">
				        	<el-button type="text" size="small" @click="gotoDetail(2,scope.row._id)">查看</el-button>
				        	<el-button type="text" size="small" @click="gotoDetail(3,scope.row._id)">编辑</el-button>
				        	<el-button type="text" size="small" @click="remove(scope.row._id)">删除</el-button>
				        </template>
			        </el-table-column>
				</el-table>
				<div class="pageDiv"  v-if="total>0">
					<el-pagination
				      @size-change="handleSizeChange"
				      @current-change="handleCurrentChange"
				      :current-page="currentPage"
				      :page-sizes="[10,15, 20, 25, 30]"
				      :page-size="pageSize"
				      layout="total, sizes, prev, pager, next, jumper"
				      :total="total">
				    </el-pagination>
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
		        
		        data: [],
		        pageSize:10,
		        currentPage: 1,
		        total:0
				
				
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
		  handleSizeChange(val) {
	        this.pageSize=val;
	        this.getList();
	      },
	      handleCurrentChange(val) {
	        this.currentPage=val;
	        this.getList();

	      },
	      remove(id){
	      	var self=this;
	      		this.$confirm('确认删除吗?', '提示', {
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
			          url:api.journalDelete,
			          params:{id:id} 
			        }).then(function (res) {
		            loading.close();
		            if(res.data.code==0){
		            	 
		                 self.$message({
		                  message:"删除成功",
		                  type: 'success'
		                }); 
		                if(self.data.length==1&&self.currentPage>1){
		                	self.currentPage--
		                } 
		                self.getList()	                  

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
		          
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
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
	        
	        self.axios({
	          method: 'get',
	          url:api.journalList,
	          params:{
	          	pageNo:this.currentPage,
	        	pageSize:this.pageSize
	          }      
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
	      gotoDetail(tit,id){
	      	this.$router.push({
	      		name:'addNotice',
	      		query:{
	      			tit:tit,
	      			id:id
	      		}
	      	})
	      }


		}
	}
</script>
<style scoped lang="scss">
</style>