<template>
	<div>
		<Header></Header>
		<div class="clientBox">
			<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span>关于我</span>
			  </div>
			  <el-row :gutter="20"   v-if="data._id">
			  	<el-col :xs="24" :sm="6">
			  		<div class="headBox">
				  		<img :src="headImg" alt="" v-if="data.head">
				  		<img src="../assets/images/head.png" alt="" v-else>
				  	</div>
			  	</el-col>
			  	<el-col :xs="24" :sm="9">
			  		<div class="baseBox">
			  			<p><span>姓名</span>{{data.name}}</p>
				  		<p><span>毕业学校</span>{{data.school}}</p>
				  		<p><span>专业</span>{{data.major}}</p>
			  		</div>			  		
			  	</el-col>
			  	<el-col :xs="24" :sm="9">
			  		<div class="baseBox">
			  			<p><span>职业</span>{{data.Occupation}}</p>
				  		<p><span>手机号</span>{{data.mobile}}</p>
				  		<p><span>邮箱</span>{{data.email}}</p>
			  		</div>	
			  	</el-col>
			  </el-row>
			  <p v-else style="text-align:center">暂无数据</p>
			  
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
				    <span>自我介绍</span>
				 </div>
				 <div v-if="data._id">
				 <div v-html="data.introduce" style="color:#666">
				 </div>
				 	
				 </div>
				 <p v-else style="text-align:center">暂无数据</p>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
				    <span>技能</span>				    
				 </div>
				<el-tag v-for="item in data.skill">{{item}}</el-tag>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
				    <span>作品</span>				    
				 </div>
				<el-table :data="work" border size="small" style="width: 100%">
					<el-table-column prop="name" label="作品名称" width="200"></el-table-column>
				    <el-table-column prop="intro" label="作品描述"></el-table-column>
				    <el-table-column label="作品地址" width="100">
				    	<template slot-scope="scope">
				    		<a :href="scope.row.url" target="_blank" style="color:rgb(64, 158, 255)"><i class="fa fa-github"></i></a>
				    	</template>
				    </el-table-column>
				</el-table>
				<div class="pageDiv"  v-if="total>0" style="text-align:center;margin-top:30px;">
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
		<Footer></Footer>
	</div>
</template>
<script>
	import api from '../api';
	import Header from './Header.vue';
	import Footer from './Footer.vue';
	export default{
		data(){
			return {
				data:{
		        	skill:[]
		        },
		        headImg:"",
		        work:[],
		        pageSize:10,
		        currentPage: 1,
		        total:0
				
			}
		},
		components:{ 
			Header,
			Footer
		},
		
		created(){
			this.getInfo();	
			this.getList()
		},
		methods:{
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
		              self.work=res.data.data.res;
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
		              if(res.data.data){
		              	  self.data=res.data.data;
			              if(self.data.head){
								self.headImg=res.data.baseUrl+res.data.data.head;
							}
		              }else{
		              	self.$message({
		                    message:"无数据",
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

		      }

		}
	}
</script>
<style scoped lang="scss">
.headBox{
	width:200px;
	max-width:100%;
	img{
		width:100%;
	}
}
.el-tag{margin:5px;}
.el-card{
	margin-bottom:20px;
}
.baseBox{
	color:#666;
	font-size:16px;
	line-height:40px;
	span{display:inline-block;width:100px;color:#333;}
}
.fa-github{
	display:block;
	font-size:30px;
	text-align:center;
	&:hover{
		color:#000
	}
}

</style>