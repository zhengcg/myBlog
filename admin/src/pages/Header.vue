<template>
	<header class="header-navigation" id="header">
	  <nav>
	    <div class="logo"><a href="javascript:;">个人博客</a></div>
	    <h2 id="mnavh"><span class="navicon"></span></h2>
	    <ul id="starlist">
	      <li><router-link :to="{name:'index'}">首页</router-link></li>
	      <li><a href="javascript:;">学习笔记</a></li>
	      <li><a href="javascript:;">生活随笔</a></li>
	      <li><a href="javascript:;">相册</a></li>
	      <li><a href="javascript:;">关于我</a></li>
	    </ul>
	  </nav>
	</header>
</template>
<style scoped lang="scss">

</style>