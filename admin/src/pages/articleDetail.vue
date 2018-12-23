<template>
	<div>
		<el-card class="box-card diaryBox">
			<div class="title">{{article.title}}</div>
			<div class="tip"><span>日期：{{article.date}}</span></div>			
            <div class="content" v-html="article.content"></div>
		</el-card>
			
	</div>
</template>
<script>
	import api from '../api';
	export default{
		data(){
			return {
				article:{}
				
			}
		},
		watch:{
	        '$route.query':function (val) {
	            let id=val.id;
				this.getArticle(id);				
				
	        }
    	},
		
		created(){
			this.getArticle(this.$route.query.id);
		},
		methods:{
			getArticle(id){
			    var self=this;
	            const loading=self.$loading({
                  lock: true,
                  text: '请求中……',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
                });
                self.axios({
                  method: 'get',
                  url:api.journalFind,
                  params:{                   
                    id:id
                  }      
                }).then(function (res) {       
                    if(res.data.code==0){
                      loading.close();
                      self.article=res.data.data;
                      
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


</style>