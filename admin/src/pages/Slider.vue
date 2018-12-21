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
			    <el-button style="float: right; padding: 3px 0" type="text">查看<i class="el-icon-arrow-right el-icon--right"></i></el-button>
			</div>
		  	<div class="noteBox">
		  		<el-tag>html</el-tag><el-tag>css</el-tag><el-tag>ES6</el-tag><el-tag>NodeJS</el-tag>
		  	</div>
		</el-card>
		<el-card class="box-card" style="margin-bottom:20px;">
	  		<div slot="header" class="clearfix">
			    <span style="vertical-align: middle"><i class="fa fa-coffee fa-fw" style="color:#409EFF"></i> 生活随笔</span>
			    <el-button style="float: right; padding: 3px 0" type="text">更多<i class="el-icon-arrow-right el-icon--right"></i></el-button>
			</div>
		  	<div class="blogBox">
		  		<p><a href="javascript:;">红尘来呀来，去呀去，来去一场空，红尘来呀来</a></p>
		  		<p><a href="javascript:;">红尘来呀来，去呀去，来去一场空，红尘来呀来</a></p>
		  		<p><a href="javascript:;">红尘来呀来，去呀去，来去一场空，红尘来呀来</a></p>
		  		<p><a href="javascript:;">红尘来呀来，去呀去，来去一场空，红尘来呀来</a></p>
		  		<p><a href="javascript:;">红尘来呀来，去呀去，来去一场空，红尘来呀来</a></p>
		  	</div>
		</el-card>
		<el-card class="box-card" style="margin-bottom:20px;">
	  		<div slot="header" class="clearfix">
			    <span style="vertical-align: middle"><i class="fa fa-camera fa-fw" style="color:#409EFF"></i> 相册</span>
			    <el-button style="float: right; padding: 3px 0" type="text">查看<i class="el-icon-arrow-right el-icon--right"></i></el-button>
			</div>
		  	<div class="photoBox">
		  		<el-row :gutter="10">
				  <el-col :span="12">
				  	<div class="box">
				  		<img src="http://localhost:3000/upload/1544689682245.png">			
				  		<div class="photoName">相册名字还是</div>  		
				  	</div>
				  </el-col>
				  <el-col :span="12">
				  	<div class="box">
				  		<img src="http://localhost:3000/upload/1544689682245.png">			
				  		<div class="photoName">相册名字还是</div>  		
				  	</div>
				  </el-col>
				  <el-col :span="12">
				  	<div class="box">
				  		<img src="http://localhost:3000/upload/1544689682245.png">			
				  		<div class="photoName">相册名字还是</div>  		
				  	</div>
				  </el-col>
				  <el-col :span="12">
				  	<div class="box">
				  		<img src="http://localhost:3000/upload/1544689682245.png">			
				  		<div class="photoName">相册名字还是</div>  		
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
				
			}
		},
		
		created(){
		},
		methods:{

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