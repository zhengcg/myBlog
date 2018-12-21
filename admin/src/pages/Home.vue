<template>
	<div>
		<Header></Header>
		<div class="clientBox">
			<el-row :gutter="20">
			  <Slider></Slider>
			  <el-col :xs="24" :sm="16" :md="18">
			  	<transition name="move" mode="out-in">
                        <router-view></router-view>
                </transition>
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

</style>