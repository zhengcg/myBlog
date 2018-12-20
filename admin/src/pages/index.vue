<template>
	<div>
		<Header></Header>
		<div class="clientBox">
			<el-row :gutter="20">
			  <el-col class="hidden-xs-only" :xs="24" :sm="8" :md="6">
			  	<el-card class="box-card" style="margin-bottom:20px;">
			  		<div slot="header" class="clearfix">
					    <span>关于我</span>
					    <el-button style="float: right; padding: 3px 0" type="text">详细<i class="el-icon-arrow-right el-icon--right"></i></el-button>
					</div>
				  孙菲菲付付过
				</el-card>
				<el-card class="box-card" style="margin-bottom:20px;">
			  		<div slot="header" class="clearfix">
					    <span>学习笔记</span>
					    <el-button style="float: right; padding: 3px 0" type="text">查看<i class="el-icon-arrow-right el-icon--right"></i></el-button>
					</div>
				  孙菲菲付付过
				</el-card>
				<el-card class="box-card" style="margin-bottom:20px;">
			  		<div slot="header" class="clearfix">
					    <span>生活随笔</span>
					    <el-button style="float: right; padding: 3px 0" type="text">更多<i class="el-icon-arrow-right el-icon--right"></i></el-button>
					</div>
				  孙菲菲付付过
				</el-card>
				<el-card class="box-card" style="margin-bottom:20px;">
			  		<div slot="header" class="clearfix">
					    <span>相册</span>
					    <el-button style="float: right; padding: 3px 0" type="text">查看<i class="el-icon-arrow-right el-icon--right"></i></el-button>
					</div>
				  孙菲菲付付过
				</el-card>
			  </el-col>
			  <el-col :xs="24" :sm="16" :md="18">
			  	<el-card class="box-card">
				  孙菲菲付付过
				</el-card>
			  </el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
	import api from '../api';
	import Header from './Header.vue';
	export default{
		data(){
			return {

				
			}
		},
		components:{ 
			Header
		},
		
		created(){
		},
		methods:{

		}
	}
</script>
<style scoped lang="scss">

</style>