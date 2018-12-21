<template>
	<div>
		<header class="header-navigation" id="header">
		  <nav>
		    <div class="logo"><a href="javascript:;">个人博客</a></div>
		    <el-button type="text" icon="el-icon-menu" circle class="btnNav" v-show="!isShow" @click="slideNav(0)"></el-button>
		    <el-button type="text" icon="el-icon-close" circle class="btnNav" v-show="isShow" @click="slideNav(1)"></el-button>
		    <ul id="starlist">
		      <li><router-link :to="{name:'index'}">首页</router-link></li>
		      <li><router-link :to="{name:'diary'}">学习笔记</router-link></li>
		      <li><a href="javascript:;">生活随笔</a></li>
		      <li><a href="javascript:;">相册</a></li>
		      <li><a href="javascript:;">关于我</a></li>
		    </ul>
		    <el-collapse-transition>
		    <ul id="miniList" v-show="isShow">
		      <li><router-link :to="{name:'index'}">首页</router-link></li>
		      <li><a href="javascript:;">学习笔记</a></li>
		      <li><a href="javascript:;">生活随笔</a></li>
		      <li><a href="javascript:;">相册</a></li>
		      <li><a href="javascript:;">关于我</a></li>
		    </ul>
		    </el-collapse-transition>
		  </nav>
		</header>
		<div style="height: 100px"></div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				isShow:false
				
			}
		},		
		created(){
		},
		methods:{
			slideNav(num){
				if(num){
					this.isShow=false
				}else{
					this.isShow=true
				}
			}

		}
	}
</script>
<style scoped lang="scss">
#header{
	position: fixed;
	height:80px;
	background:#fff;
	width:100%;
	z-index: 100000;
	box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
	.btnNav{
		position: absolute;
		right:20px;
		top:20px;
		display:none;
	}
	#miniList{
		display:none;
	}
	nav{
		max-width:1200px;
		margin:0 auto;
		.logo{
			float:left;
			line-height:80px;
			font-size:20px;
		}
		ul{
			float:right;
			li{
				float:left;
				a{
					display:block;
					height:80px;
					line-height:80px;
					padding:0 30px;
					&:hover{
						background:#ecf5ff;
					}
				}
				a.router-link-active{
					background:#ecf5ff;
				}
			}
		}
	}
}
@media screen and ( max-width: 1200px ) {
	#header{
		padding:0 20px;
		box-sizing:border-box;

	}
}
@media screen and ( max-width: 700px ) {
	#header{
		.btnNav{
			display:block;
		}
		#starlist{display: none;}
		#miniList{
			display:block;
			float:none;
			background:#fff;
			position:fixed;
			width:100%;
			left:0;
			top:80px;
			box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
			li{
				float:none;
				a{
					text-align:center;
				}
			}
		}

	}
}

</style>