<template>
	<div>
		<Header></Header>
		<div class="clientBox">
			<el-row :gutter="20">
			  <Slider></Slider>
			  <el-col :xs="24" :sm="16" :md="18">
			  	<el-card class="box-card" style="margin-bottom:20px">
				  <div slot="header" class="clearfix">
				    <span>给的撒娇和高房价是否会是尽快发货时开关机换个方式就</span>
				    <span class="pull-right"><i class="el-icon-time"></i> 2018-10-10</span>
				  </div>
				  <div class="bodyBox">
				  	<div class="tipBox">
				  		<label>标签：html</label>
				  		<label>关键字：<span>对方是否</span><span>对否</span><span>方是否</span></label>
				  	</div>
				  	<div class="bodyContent">
				  		估计大恒大金服好地方萨克斯的地方脚后跟肯定是多喝水福建省地方很结实的共和党坚实的更快更好更快施工队很关键的复合弓
				  	</div>
				  </div>
				</el-card>
				<el-card class="box-card" style="margin-bottom:20px">
				  <div slot="header" class="clearfix">
				    <span>给的撒娇和高房价是否会是尽快发货时开关机换个方式就</span>
				    <span class="pull-right"><i class="el-icon-time"></i> 2018-10-10</span>
				  </div>
				  <div class="bodyBox">
				  	<div class="tipBox">
				  		<label>标签：html</label>
				  		<label>关键字：<span>对方是否</span><span>对否</span><span>方是否</span></label>
				  	</div>
				  	<div class="bodyContent">
				  		估计大恒大金服好地方萨克斯的地方脚后跟肯定是多喝水福建省地方很结实的共和党坚实的更快更好更快施工队很关键的复合弓
				  	</div>
				  </div>
				</el-card>
				<el-card class="box-card" style="margin-bottom:20px">
				  <div slot="header" class="clearfix">
				    <span>给的撒娇和高房价是否会是尽快发货时开关机换个方式就</span>
				    <span class="pull-right"><i class="el-icon-time"></i> 2018-10-10</span>
				  </div>
				  <div class="bodyBox">
				  	<div class="tipBox">
				  		<label>标签：html</label>
				  		<label>关键字：<span>对方是否</span><span>对否</span><span>方是否</span></label>
				  	</div>
				  	<div class="bodyContent">
				  		估计大恒大金服好地方萨克斯的地方脚后跟肯定是多喝水福建省地方很结实的共和党坚实的更快更好更快施工队很关键的复合弓
				  	</div>
				  </div>
				</el-card>
				<el-card class="box-card" style="margin-bottom:20px">
				  <div slot="header" class="clearfix">
				    <span>给的撒娇和高房价是否会是尽快发货时开关机换个方式就</span>
				    <span class="pull-right"><i class="el-icon-time"></i> 2018-10-10</span>
				  </div>
				  <div class="bodyBox">
				  	<div class="tipBox">
				  		<label>标签：html</label>
				  		<label>关键字：<span>对方是否</span><span>对否</span><span>方是否</span></label>
				  	</div>
				  	<div class="bodyContent">
				  		估计大恒大金服好地方萨克斯的地方脚后跟肯定是多喝水福建省地方很结实的共和党坚实的更快更好更快施工队很关键的复合弓
				  	</div>
				  </div>
				</el-card>
			  </el-col>
			</el-row>
		</div>
		<Footer></Footer>
	</div>
</template>
<script>
	import api from '../api';
	import Header from './Header.vue';
	import Slider from './Slider.vue';
	import Footer from './Footer.vue';
	export default{
		data(){
			return {
				
			}
		},
		components:{ 
			Header,
			Slider,
			Footer
		},
		
		created(){
		},
		methods:{

		}
	}
</script>
<style scoped lang="scss">
.bodyBox{
	.tipBox{
		font-size:12px;
		color:#888;
		label{
			margin-right:30px;
			span{
				padding:0 5px;
			}
		}
	}
	.bodyContent{
		margin-top:20px;
		font-size:14px;
		color:#666;
	}
}

</style>