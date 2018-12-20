<template>
	<div>
		<header class="header-navigation" id="header">
		  <nav>
		    <div class="logo"><a href="javascript:;">个人博客</a></div>
		    <ul id="starlist">
		      <li><router-link :to="{name:'index'}">首页</router-link></li>
		      <li><a href="javascript:;">学习笔记</a></li>
		      <li><a href="javascript:;">生活随笔</a></li>
		      <li><a href="javascript:;">相册</a></li>
		      <li><a href="javascript:;">关于我</a></li>
		    </ul>
		  </nav>
		</header>
		<div style="height: 100px"></div>
	</div>
</template>
<style scoped lang="scss">
#header{
	position: fixed;
	height:80px;
	background:#fff;
	width:100%;
	box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
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
						background:#409eff;
						color:#fff;
					}
				}
				a.router-link-active{
					background:#409eff;
					color:#fff;
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

</style>