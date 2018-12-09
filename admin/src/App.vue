<template>
  <div id="app">
    <router-view/>
    
  </div>
</template>

<script>
    // import * as types from './store/types'
    // import {mapState} from 'vuex'

    export default {
        name: 'app',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
            }
        },
        mounted(){
            

        },
        watch:{
            '$route':function(to,from){
　　　　　　　　　　 document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0; 
           }
        },
   /*     computed: mapState({
            title: state => state.title,
            token: state => state.token
        }),*/
          
        methods: {
   
        }
    }
</script>

<style  lang="scss">
html,body{
    height:100%;
    background:#f3f3f3;

}
.clearfix:after{content: '';display: block;height: 0;clear: both;-ms-zoom: 1;}
#app,#home{
    height:100%;
}
*{
    margin:0;
    padding:0;
    word-break: break-all;
}

</style>
