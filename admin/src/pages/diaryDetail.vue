<template>
	<div>
		<el-card class="box-card diaryBox">
			<div class="title">{{diary.title}}</div>
			<div class="tip"><span>日期：{{diary.date}}</span><span>标签：{{diary.label}}</span></div>
			<div class="intro">{{diary.remark}}</div>
			<div class="keyBox">关键字：<span v-for="i in diary.key">{{i}}</span></div>
			
            <div class="content" v-html="diary.html"></div>
		</el-card>
			
	</div>
</template>
<script>
	import api from '../api';
	export default{
		data(){
			return {
				diary:{}
				
			}
		},
		
		
		created(){
			this.getDiary(this.$route.query.id);
		},
		methods:{
			getDiary(id){
			    var self=this;
	            const loading=self.$loading({
                  lock: true,
                  text: '请求中……',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
                });
                self.axios({
                  method: 'get',
                  url:api.noteFind,
                  params:{                   
                    id:id
                  }      
                }).then(function (res) {       
                    if(res.data.code==0){
                      loading.close();
                      self.diary=res.data.data;
                      
                    }else{
                      loading.close();
                            
                      self.$message({
                            message:res.data.message,
                            type: 'warning'
                          });  
                         
                    }

                           
                  }).catch(function (error) {
                    loading.close();
                    self.$message({
                            message:error,
                            type: 'warning'
                          }); 
                               　　
                  });

		      }
		     

		}
	}
</script>
<style scoped lang="scss">
.title{
	font-size:20px;
	color:#000;
	margin-bottom:20px;
}
.tip{
	text-align:center;
	color:#999;
	font-size:12px;
	margin-bottom:30px;
	span{
		margin:0 10px;
	}
}
.intro{
	font-size:14px;
	text-indent:2em;
	color:#666;
	margin-bottom:20px;
}
.keyBox{
	font-size:14px;
	color:#000;
	margin-bottom:20px;
	span{margin:5px;color:#666}

}


</style>