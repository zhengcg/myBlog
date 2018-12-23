<template>
	<div id="user">
		<div class="targ">
			<ol class="breadcrumb">
				<li>学习笔记</li>
                <li>{{fTitle}}</li>
			</ol>
		</div>
		<div class="mainBox">
			<div class="titHead">
				<el-row>
				  <el-col :xs="24" :sm="14" :md="14" :lg="8" :xl="8">
				  	<h1 class="page-title txt-color-blueDark"><i class="fa fa-graduation-cap fa-fw"></i> 学习笔记 <span>&gt; {{fTitle}}</span></h1>			  	
				  </el-col>
				  <el-col :xs="24" :sm="10" :md="10" :lg="16" :xl="16">
				  	<div class="titHeadTab">
                        
					  	<el-button type="primary" size="small" @click="submit"  v-show="fTitle!=='查看'">发表</el-button>		
                        <el-button type="primary" size="small" icon="el-icon-back" @click="goBack">返回</el-button>
					</div>
				  </el-col>
				  
				</el-row>
			</div>
			<el-card class="box-card" v-show="fTitle!=='查看'">
				<div slot="header" class="clearfix">
				    <span>基本信息</span>
				 </div>
				<div class="box">
		            <el-input
		              placeholder="请输入标题（建议60字以内）"
		              clearable 
		              maxlength="60"
		              v-model="title">
		            </el-input>
		        </div>
            <div class="box">
                <el-input type="textarea" v-model="remark" placeholder="摘要" :rows="5"></el-input>
            </div>
                <div class="box">
                    <el-select v-model="label" placeholder="选择标签">
                      <el-option  label="全部" value=""></el-option>
                      <el-option :label="item.name" :value="item.name" :key="item._id" v-for="item in labels"></el-option>
                    </el-select>
                </div>
                <div class="box">
                    <el-tag
                      :key="tag"
                      v-for="tag in keys"
                      closable
                      :disable-transitions="false"
                      @close="handleClose(tag)">
                      {{tag}}
                    </el-tag>
                    <el-input
                      class="input-new-tag"
                      v-if="inputVisible"
                      v-model="inputValue"
                      ref="saveTagInput"
                      size="small"
                      @keyup.enter.native="handleInputConfirm"
                      @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New key</el-button>
                </div>
        	</el-card>
        	<el-card class="box-card" v-show="fTitle!=='查看'">
        		<div slot="header" class="clearfix">
				    <span>正文</span>
				 </div>
				<mavon-editor :ishljs = "true" v-model="content" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 500px"/>
	            
        	</el-card>
            <el-card class="box-card" v-show="fTitle=='查看'">
                <div id="noticeDiv">
                    <div class="box">
                        <h3>{{title}}</h3>
                        <p class="time"><i class="el-icon-time"></i> {{date}}<span style="margin-left:2em;">标签：{{label}}</span></p>
                        <p ><span>关键字：{{keys.join(" | ")}}</span></p>
                    </div>
                    <div class="box">摘要：{{remark}}</div>
                    <div class="box" v-html="html"></div>
                    
                </div>
                
                
            </el-card>
						
		</div>
    </div>
</template>

<script>
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css';
    import api from '../../api'
    // import marked from 'marked';
    // import highlightJs from 'highlight.js';
    export default {
        data: function(){
            return {
                content:'',
                html:'',
                inputVisible: false,
                inputValue: '',
                keys:[],
                title:'',
                label:'',
                remark:'',
                _id:'',
                labels:[],
                date:'',
                configs: {
                }
            }
        },
        components: {
            mavonEditor
        },
        created(){
            let tit=this.$route.query.tit;
            if(tit==1){
                this.fTitle="发表";
                this._id="";
                this.title="";
                this.remark="";
                this.keys=[];
                this.label="";
            }else if(tit==2){
                this.fTitle="查看";
                this.getDetail(this.$route.query.id);
            }else{
                this.fTitle="编辑";
                this.getDetail(this.$route.query.id);
            }
            this.getLabel();

        },
        mounted(){

        },
        methods: {
            goBack(){
                this.$router.go(-1);
            },
            handleClose(tag) {
                this.keys.splice(this.keys.indexOf(tag), 1);
              },

          showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
              this.$refs.saveTagInput.$refs.input.focus();
            });
          },

          handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
              this.keys.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
            
          },
          getDetail(id){
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
                      self.title=res.data.data.title;
                      self.date=res.data.data.date;
                      self.remark=res.data.data.remark;
                      self.content=res.data.data.content;
                      self.keys=res.data.data.key;
                      self.label=res.data.data.label;
                      self._id=res.data.data._id;
                      
                    }else{
                      loading.close();
                            
                      self.$message({
                            message:res.data.message,
                            type: 'warning'
                          });  
                         
                    }

                           
                  }).catch(function (error) {
                    loading.close();
                    // self.$message({
                    //         message:error,
                    //         type: 'warning'
                    //       }); 
                               　　
                  });

          },
            getLabel(){
            var self=this;
            const loading=self.$loading({
              lock: true,
              text: '请求中……',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            
            self.axios({
              method: 'get',
              url:api.labelList    
            }).then(function (res) {       
                if(res.data.code==0){
                  loading.close();
                  self.labels=res.data.data;
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

            },
            // 将图片上传到服务器，返回地址替换到md中
            $imgAdd(pos, $file){
                let self=this;
                var formdata = new FormData();
                formdata.append('file', $file);
                // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
                this.axios({
                    url:api.file,
                    method:'post',
                    data: formdata,
                    headers: { 'Content-Type': 'multipart/form-data',authorization:`token ${self.$store.state.token}` },
                }).then(res => {
                    let img=res.data.baseUrl+res.data.filename; 
                    this.$refs.md.$img2Url(pos, img);
                })
            },
            change(value, render){
                // render 为 markdown 解析后的结果
                this.html = render;
            },
            submit(){
                var self=this;
                if(self.title==""){
                    self.$message({
                          message:"请填写标题",
                          type: 'warning'
                        });  
                }else if(self.remark==""){
                    self.$message({
                          message:"请填写摘要",
                          type: 'warning'
                        }); 
                }else if(self.label==""){
                    self.$message({
                          message:"请选择标签",
                          type: 'warning'
                        }); 
                }else if(self.keys.length==0){
                    self.$message({
                          message:"请添加关键字",
                          type: 'warning'
                        });
                }else if(self.content==""){
                    self.$message({
                          message:"请填写文章内容",
                          type: 'warning'
                        });
                }else{
                    const loading=self.$loading({
                      lock: true,
                      text: '请求中……',
                      spinner: 'el-icon-loading',
                      background: 'rgba(0, 0, 0, 0.7)'
                    });
                    let submitData={
                        _id:self._id,
                        title:self.title,
                        remark:self.remark,
                        label:self.label,
                        key:self.keys,
                        content:self.content,
                        html:self.html
                    }
                    self.axios({
                      method: 'post',
                      url:api.noteSave,
                      data:submitData    
                    }).then(function (res) {       
                        if(res.data.code==0){
                          loading.close();
                          self.$message({
                                message:"发表成功",
                                type: 'success'
                              }); 
                          self.$router.push({
                            name:'blog'
                          });
                          
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
    }
</script>
<style scoped lang="scss">
#noticeDiv{
    h3{
        text-align:center;
        font-size:20px;
    }
    .time{
        text-align:center;
        color:#999;
        font-size:12px;
        line-height:40px;
    }
    .headBox{
        img{
            width:100%;
        }
    }
    .userInfoBox{
        p{
            line-height:1.5;
            margin-bottom:15px;
        }
    }
}
    .box{
        margin-bottom:20px;
    }
    .el-tag {
        margin-right: 10px;
        margin-bottom:10px;
      }
      .button-new-tag {
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
      }
      .input-new-tag {
        width: 90px;
        vertical-align: top;
      }
</style>