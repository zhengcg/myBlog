<template>
	<div id="home">
		<Top></Top>
		<Nav @isHide="isHideSide=!isHideSide"></Nav>
		<div class="content-box" :class="{'content-collapse':isHideSide}">
            <div class="content">
                <transition name="move" mode="out-in">
                        <router-view></router-view>
                </transition>
            </div>
            <Foot></Foot>
        </div>   
	</div>
</template>
<script>
	import Top from './common/top'
	import Nav from './common/nav'
	import Foot from './common/bottom'
	export default{
		data(){
			return {
				isHideSide:false
			}
		},
		components:{ 
			Top,
			Nav,
			Foot
		}
	}
</script>
<style scoped lang="scss">
</style>