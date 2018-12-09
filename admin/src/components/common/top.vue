<template>
	<div id="top">
    <div class="header">
      <em class="role"><i class="fa fa-user-circle"></i>博客管理后台</em>
      
      <div class="pull-right">

        <a href="javascript:;" class="iconBtn" @click="handleFullScreen">
            <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                <i class="el-icon-rank"></i>
            </el-tooltip>
        </a>
        <a href="javascript:;" class="iconBtn" @click="loginout">
            <el-tooltip effect="dark" content="退出登录" placement="bottom">
                <i class="fa fa-sign-out"></i>
            </el-tooltip>
        </a>       
      </div>
    </div>
    
	</div>
</template>
<script>
import api from '../../api'
export default {
  name: 'hello',
  data() {
    return {    
      fullscreen:false
    }
  },
  created(){
    var self=this;

  },
  mounted() {
    
  },
  methods: {
    // 退出登录
    loginout(){
      var self=this;
      self.$router.push({
        name:'login'
      })

    },
    // 全屏事件
    handleFullScreen(){
        let element = document.documentElement;
        if (this.fullscreen) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        } else {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullScreen) {
                element.webkitRequestFullScreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                // IE11
                element.msRequestFullscreen();
            }
        }
        this.fullscreen = !this.fullscreen;
    }
   

  }
   

  
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/top.scss"
</style>