<template>
	<div id="user">
		<div class="targ">
			<ol class="breadcrumb">
				<li>学习笔记</li>
			</ol>
		</div>
		<div class="mainBox">
			<div class="titHead">
				<el-row>
				  <el-col :xs="24" :sm="14" :md="14" :lg="8" :xl="8">
				  	<h1 class="page-title txt-color-blueDark"><i class="fa fa-graduation-cap fa-fw"></i> 学习笔记</h1>			  	
				  </el-col>
				  <el-col :xs="24" :sm="10" :md="10" :lg="16" :xl="16">
				  	<div class="titHeadTab">
					  	<el-button type="primary" size="small">发表</el-button>		
					</div>
				  </el-col>
				  
				</el-row>
			</div>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
				    <span>基本信息</span>
				 </div>
				<div class="box">
		            <el-input
		              placeholder="请输入标题（建议30字以内）"
		              clearable 
		              maxlength="30"
		              v-model="title">
		            </el-input>
		        </div>
        	</el-card>
        	<el-card class="box-card">
        		<div slot="header" class="clearfix">
				    <span>正文</span>
				 </div>
				<mavon-editor :ishljs = "true" v-model="content" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 600px"/>
	            
        	</el-card>
						
		</div>
    </div>
</template>

<script>
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css';
    // import marked from 'marked';
    // import highlightJs from 'highlight.js';
    export default {
        data: function(){
            return {
                content:'',
                html:'',
                configs: {
                }
            }
        },
        components: {
            mavonEditor
        },
        mounted(){

        },
        methods: {
            // 将图片上传到服务器，返回地址替换到md中
            $imgAdd(pos, $file){
                var formdata = new FormData();
                formdata.append('file', $file);
                // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
                this.$axios({
                    url: '/common/upload',
                    method: 'post',
                    data: formdata,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then((url) => {
                    this.$refs.md.$img2Url(pos, url);
                })
            },
            change(value, render){
                // render 为 markdown 解析后的结果
                this.html = render;
            },
            submit(){
                console.log(this.content);
                console.log(this.html);
                this.$message.success('提交成功！');
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '../../assets/css/notice.scss'
</style>