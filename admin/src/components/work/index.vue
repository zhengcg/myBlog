<template>
	<div id="user">
		<div class="targ">
			<ol class="breadcrumb">
				<li>作品管理管理</li>
			</ol>
		</div>
		<div class="mainBox">
			<div class="titHead">
				<el-row>
				  <el-col :xs="24" :sm="14" :md="14" :lg="8" :xl="8">
				  	<h1 class="page-title txt-color-blueDark"><i class="el-icon-star-on"></i> 作品管理</h1>			  	
				  </el-col>
				  <el-col :xs="24" :sm="10" :md="10" :lg="16" :xl="16">
				  	<div class="titHeadTab">
					  	<el-button type="primary" size="small" @click="workPop=true">添加作品</el-button>		
					</div>
				  </el-col>
				  
				</el-row>
			</div>
			<el-card class="box-card">
				<el-table :data="data" border size="small" style="width: 100%">
					<el-table-column prop="name" label="作品名称"></el-table-column>
				    <el-table-column prop="intro" label="作品描述"></el-table-column>
				    <el-table-column label="作品地址" width="400">
				    	<template slot-scope="scope">
				    		<a :href="scope.row.url" target="_blank" style="color:rgb(64, 158, 255)">{{scope.row.url}}</a>
				    	</template>
				    </el-table-column>
				    <el-table-column label="操作" width="120">
				        <template slot-scope="scope">
				        	<el-button type="text" size="small" @click="editFn(scope.row._id)">修改</el-button>
				        	<el-button type="text" size="small" @click="deleteL(scope.row._id)">删除</el-button>
				        </template>
			        </el-table-column>
				</el-table>
				<div class="pageDiv"  v-if="total>0">
					<el-pagination
				      @size-change="handleSizeChange"
				      @current-change="handleCurrentChange"
				      :current-page="currentPage"
				      :page-sizes="[2,3,10,15, 20, 25, 30]"
				      :page-size="pageSize"
				      layout="total, sizes, prev, pager, next, jumper"
				      :total="total">
				    </el-pagination>
				</div>

			</el-card>
						
		</div>



		<!-- 添加作品 -->
		<el-dialog :title="title" :visible.sync="workPop" width="40%"  @close="closeFn">
		  <el-form label-position="right"   label-width="100px" :model="addForm">
			  <el-form-item label="作品名称">
			    <el-input v-model="addForm.name" type="text" clearable></el-input>
			  </el-form-item>
			  <el-form-item label="作品描述">
			    <el-input v-model="addForm.intro" type="text" clearable></el-input>
			  </el-form-item>
			  <el-form-item label="作品地址">
			    <el-input v-model="addForm.url" type="url" clearable></el-input>
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
		        data: [
		        	
		        ],
		        workPop:false,
		        pageSize:10,
		        currentPage: 1,
		        total:0,
		        addForm:{
		        	_id:'',
		        	name:'',
		        	intro:'',
		        	url:''
		        },
		        title:"添加作品"
				
				
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
		        	name:'',
		        	intro:'',
		        	url:''
		        };
		        this.title="添加作品"

		  },
		  handleSizeChange(val) {
		      this.pageSize=val;
		      this.getList();
		    },
	      handleCurrentChange(val) {
	          this.currentPage=val;
	          this.getList();
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
	        let submitData={
	        	currentPage:this.currentPage,
	        	pageSize:this.pageSize
	        }
	        self.axios({
	          method: 'get',
	          url:api.workList,
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
		          url:api.workSave,
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
	      	self.title="编辑作品";
	      	const loading=self.$loading({
	          lock: true,
	          text: '请求中……',
	          spinner: 'el-icon-loading',
	          background: 'rgba(0, 0, 0, 0.7)'
	        });
	        
	        self.axios({
	          method: 'get',
	          url:api.workFind,
	          params:{id:id}     
	        }).then(function (res) {       
	            if(res.data.code==0){
	              loading.close();
	              self.addForm=res.data.data;
	              self.workPop=true;
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
	      deleteL(id){
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
		          url:api.workDelete,
		          params:{id:id}
		        }).then(function (res) {       
		            if(res.data.code==0){
		              loading.close();
		              self.$message({
		                    message:"删除成功",
		                    type: 'warning'
		                  });
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
	            
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
	      },
	      validate(){
	      	let self=this;
	      	let match = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/;
	      	let flag=false;
	      	if(self.addForm.name==""){
	      		flag=false;
	      		self.$message({
	              message:"请输入作品名称",
	              type: 'warning'
	            }); 
	      	}else if(self.addForm.intro==""){
	      		flag=false;
	      		self.$message({
	              message:"请输入作品描述",
	              type: 'warning'
	            }); 

	      	}else if(self.addForm.url==""){
	      		flag=false;
	      		self.$message({
	              message:"请输入作品地址",
	              type: 'warning'
	            }); 
	      	}else if(!match.test(self.addForm.url)){
	      		flag=false;
	      		self.$message({
	              message:"请输入正确的作品地址",
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

</style>