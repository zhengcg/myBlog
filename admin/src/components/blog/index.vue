<template>
	<div id="notice">
		<div class="targ">
			<ol class="breadcrumb">
				<li>学习笔记</li>
			</ol>
		</div>
		<div class="mainBox">
			<div class="titHead">
				<el-row>
				  <el-col :xs="24" :sm="14" :md="14" :lg="8" :xl="8">
				  	<h1 class="page-title txt-color-blueDark"><i class="fa fa-graduation-cap fa-fw"></i> 学习笔记 </h1>			  	
				  </el-col>
				  <el-col :xs="24" :sm="10" :md="10" :lg="16" :xl="16">
				  	<div class="titHeadTab">
				  		<el-button type="primary" size="small" @click="workPop=true">标签管理</el-button>	
					  	<el-button type="primary" size="small" @click="gotoDetail(1,0)">创作</el-button>	
					</div>
				  </el-col>
				  
				</el-row>
			</div>
			<el-card class="box-card">
				<el-form :inline="true" :model="form" class="demo-form-inline" size="small">	
			 	   <el-form-item label="标签">
				    <el-select v-model="form.label" @change="getList(1)">
				      <el-option  label="全部" value=""></el-option>
			    	  <el-option :label="item.name" :value="item.name" :key="item._id" v-for="item in labels"></el-option>
				    </el-select>
				  </el-form-item>				    
				</el-form>
				<el-table :data="data" border size="small" style="width: 100%">
				    <el-table-column prop="title" label="标题"></el-table-column>
				    <el-table-column prop="label" label="标签"></el-table-column>
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

		<el-dialog title="标签管理" :visible.sync="workPop" width="40%" >
		  	<div style="min-height:200px;">
		  		<el-tag
				  :key="tag._id"
				  v-for="tag in labels"
				  closable
				  :disable-transitions="false"
				  @close="handleClose(tag.name)">
				  {{tag.name}}
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
				<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New label</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import api from '../../api'
	export default{
		data(){
			return {
		        form:{
		        	label:''
		        },
		        data: [],
		        labels:[],
		        workPop:false,
		        pageSize:10,
		        currentPage: 1,
		        total:0,
		        inputVisible: false,
        		inputValue: ''
				
				
			}
		},
		computed:{

		},
		created(){
			this.getLabel();
			this.getList();

		},
		mounted(){
			
		},
		methods:{
		  handleClose(tag) {
	        // this.labels.splice(this.labels.indexOf(tag), 1);
	        this.deleteLabel(tag);
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
	          // this.labels.push(inputValue);
	          this.saveLabel(inputValue);
	        }
	        this.inputVisible = false;
	        this.inputValue = '';
	        
	      },
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
			          url:api.noteDelete,
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
	        let submitData={
	        	pageNo:this.currentPage,
	        	pageSize:this.pageSize

	        }
	        if(self.form.label){
	        	submitData.label=self.form.label;
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
	      saveLabel(name){
	      	var self=this;
	      	const loading=self.$loading({
	          lock: true,
	          text: '请求中……',
	          spinner: 'el-icon-loading',
	          background: 'rgba(0, 0, 0, 0.7)'
	        });
	        
	        self.axios({
	          method: 'post',
	          url:api.labelSave,
	          data:{name:name}    
	        }).then(function (res) {       
	            if(res.data.code==0){
	              loading.close();
	              self.$message({
	                    message:res.data.message,
	                    type: 'success'
	                  }); 
	              self.getLabel()
	        		
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
	      deleteLabel(name){
	      	var self=this;
	      	const loading=self.$loading({
	          lock: true,
	          text: '请求中……',
	          spinner: 'el-icon-loading',
	          background: 'rgba(0, 0, 0, 0.7)'
	        });
	        
	        self.axios({
	          method: 'get',
	          url:api.labelDelete,
	          params:{name:name}    
	        }).then(function (res) {       
	            if(res.data.code==0){
	              loading.close();
	              self.$message({
	                    message:res.data.message,
	                    type: 'success'
	                  }); 
	              self.getLabel();
	        		
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
	      		name:'addBlog',
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
</style>